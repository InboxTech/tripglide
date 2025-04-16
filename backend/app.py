from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import re
import logging
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from livereload import Server
import os
from dotenv import load_dotenv
from datetime import timedelta

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow React frontend

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# MySQL Connection
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # Use environment variable or default to empty
        database="tripglide"
    )
    logger.info("Database connection established successfully")
except mysql.connector.Error as e:
    logger.error(f"Failed to connect to database: {str(e)}")
    raise

# Twilio Configuration
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_VERIFY_SERVICE_SID = os.getenv('TWILIO_VERIFY_SERVICE_SID')

if not all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID]):
    logger.error("Twilio environment variables are missing")
    raise ValueError("Twilio configuration is incomplete")

# Initialize Twilio client
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Validation Functions
def is_email(input_str):
    email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(email_pattern, input_str))

def is_phone(input_str):
    phone_pattern = r'^\d{10}$'
    return bool(re.match(phone_pattern, input_str))

def validate_password(password):
    return len(password) >= 6

# Send Verification via Twilio Verify API
def send_verification(identifier, channel='sms'):
    try:
        verification = twilio_client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID) \
            .verifications \
            .create(to=identifier if channel == 'email' else f"+91{identifier}", channel=channel)
        logger.info(f"Verification sent to {identifier} via {channel}: {verification.sid}")
        return verification.sid
    except TwilioRestException as e:
        logger.error(f"Twilio error sending verification to {identifier}: {str(e)}")
        raise

# Verify Code via Twilio Verify API
def verify_code(identifier, code, channel='sms'):
    try:
        verification_check = twilio_client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID) \
            .verification_checks \
            .create(to=identifier if channel == 'email' else f"+91{identifier}", code=code)
        if verification_check.status == 'approved':
            logger.info(f"Verification successful for {identifier} via {channel}")
            return True
        else:
            logger.warning(f"Verification failed for {identifier}: {verification_check.status}")
            return False
    except TwilioRestException as e:
        logger.error(f"Twilio error verifying code for {identifier}: {str(e)}")
        return False

# API Endpoints

@app.route("/api/reset", methods=["POST"])
def reset():
    try:
        logger.info("Server state reset successfully")
        return jsonify({"success": True, "message": "Server state reset successfully"}), 200
    except Exception as e:
        logger.error(f"Error resetting server state: {str(e)}")
        return jsonify({"success": False, "error": "Server error during reset"}), 500

@app.route("/api/signup", methods=["POST"])
def signup():
    cursor = None
    try:
        data = request.json
        identifier = data.get("identifier")
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if not identifier or not password or not confirm_password:
            return jsonify({"success": False, "error": "All fields are required."}), 400

        if password != confirm_password:
            return jsonify({"success": False, "error": "Passwords do not match."}), 400

        if not validate_password(password):
            return jsonify({"success": False, "error": "Password must be at least 6 characters."}), 400

        if not (is_email(identifier) or is_phone(identifier)):
            return jsonify({"success": False, "error": "Invalid email or phone number."}), 400

        cursor = db.cursor()
        field = "email" if is_email(identifier) else "phone"
        
        cursor.execute(f"SELECT * FROM users WHERE {field} = %s", (identifier,))
        if cursor.fetchone():
            return jsonify({"success": False, "error": "User already exists."}), 409

        cursor.execute(
            f"INSERT INTO users ({field}, password, username, gender) VALUES (%s, %s, %s, %s)",
            (identifier, password, "NewUser", "UNKNOWN")
        )
        db.commit()
        logger.info(f"User signed up with {field}: {identifier}")
        return jsonify({"success": True, "message": "User registered successfully! Please log in."}), 201

    except Exception as e:
        db.rollback()
        logger.error(f"Error in signup: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/login", methods=["POST"])
def login():
    cursor = None
    try:
        data = request.json
        identifier = data.get("identifier")
        password = data.get("password")

        if not identifier or not password:
            return jsonify({"success": False, "error": "Identifier and password are required."}), 400

        if not (is_email(identifier) or is_phone(identifier)):
            return jsonify({"success": False, "error": "Invalid email or phone number."}), 400

        cursor = db.cursor(dictionary=True)
        field = "email" if is_email(identifier) else "phone"
        cursor.execute(f"SELECT * FROM users WHERE {field} = %s AND password = %s", (identifier, password))
        user = cursor.fetchone()

        if not user:
            return jsonify({"success": False, "error": "Invalid credentials"}), 401

        if field == "phone" and not user["phone_verified"]:
            send_verification(identifier, channel='sms')
            return jsonify({"success": False, "requires_verification": True, "message": "Please verify your phone.", "identifier": identifier, "type": "phone"}), 200
        elif field == "email" and not user["email_verified"]:
            send_verification(identifier, channel='email')
            return jsonify({"success": False, "requires_verification": True, "message": "Please verify your email.", "identifier": identifier, "type": "email"}), 200

        user_data = {k: v for k, v in user.items() if k != "password"}
        logger.info(f"User logged in with {field}: {identifier}")
        return jsonify({"success": True, "user": user_data}), 200

    except Exception as e:
        logger.error(f"Error in login: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/verify_code", methods=["POST"])
def verify_code_route():
    cursor = None
    try:
        data = request.json
        identifier = data.get("identifier")
        code = data.get("code")

        if not identifier or not code:
            return jsonify({"success": False, "error": "Identifier and code are required."}), 400

        if not (is_email(identifier) or is_phone(identifier)):
            return jsonify({"success": False, "error": "Invalid email or phone number."}), 400

        channel = 'email' if is_email(identifier) else 'sms'
        if verify_code(identifier, code, channel):
            cursor = db.cursor()
            field = "email_verified" if is_email(identifier) else "phone_verified"
            cursor.execute(f"UPDATE users SET {field} = 1 WHERE {'email' if is_email(identifier) else 'phone'} = %s", (identifier,))
            db.commit()
            logger.info(f"{field.split('_')[0].capitalize()} verified for {identifier}")
            return jsonify({"success": True, "message": f"{field.split('_')[0].capitalize()} verified successfully! Please log in again."}), 200
        else:
            return jsonify({"success": False, "error": "Invalid or expired verification code."}), 400

    except Exception as e:
        db.rollback()
        logger.error(f"Error in verify_code: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/request_verification", methods=["POST"])
def request_verification():
    cursor = None
    try:
        data = request.json
        identifier = data.get("identifier")

        if not identifier or not is_phone(identifier):
            return jsonify({"success": False, "error": "Valid phone number is required."}), 400

        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE phone = %s", (identifier,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"success": False, "error": "User not found."}), 404

        if user["phone_verified"]:
            return jsonify({"success": False, "error": "Phone already verified."}), 400

        verification_sid = send_verification(identifier, channel='sms')
        return jsonify({"success": True, "message": "Verification code sent to phone.", "sid": verification_sid}), 200

    except Exception as e:
        logger.error(f"Error in request_verification: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/profile", methods=["GET"])
def get_profile():
    cursor = None
    try:
        identifier = request.args.get("identifier")
        if not identifier:
            return jsonify({"success": False, "error": "Identifier is required."}), 400

        cursor = db.cursor(dictionary=True)
        field = "email" if is_email(identifier) else "phone" if is_phone(identifier) else None
        if not field:
            return jsonify({"success": False, "error": "Invalid email or phone number."}), 400

        cursor.execute(f"SELECT * FROM users WHERE {field} = %s", (identifier,))
        user = cursor.fetchone()
        if user:
            user_data = {k: v for k, v in user.items() if k != "password"}
            return jsonify({"success": True, "user": user_data}), 200
        else:
            return jsonify({"success": False, "error": "User not found."}), 404

    except Exception as e:
        logger.error(f"Error in get_profile: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/update_profile", methods=["POST"])
def update_profile():
    cursor = None
    try:
        data = request.json
        identifier = data.get("identifier")

        if not identifier:
            return jsonify({"success": False, "error": "Identifier is required."}), 400

        field = "email" if is_email(identifier) else "phone" if is_phone(identifier) else None
        if not field:
            return jsonify({"success": False, "error": "Invalid email or phone number."}), 400

        phone = data.get("phone")
        email = data.get("email")
        if phone and not is_phone(phone):
            return jsonify({"success": False, "error": "Invalid phone number format (10 digits required)."}), 400
        if email and not is_email(email):
            return jsonify({"success": False, "error": "Invalid email format."}), 400

        cursor = db.cursor()
        update_query = """
        UPDATE users SET 
            username = %s, birthday = %s, gender = %s, address = %s, 
            pincode = %s, state = %s, phone = %s, email = %s
        WHERE """ + field + """ = %s
        """
        values = (
            data.get("username"),
            data.get("birthday"),
            data.get("gender"),
            data.get("address"),
            data.get("pincode"),
            data.get("state"),
            phone,
            email,
            identifier,
        )

        cursor.execute(update_query, values)
        db.commit()
        logger.info(f"Profile updated for {field}: {identifier}")
        return jsonify({"success": True, "message": "Profile updated successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error in update_profile: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/change_password", methods=["POST"])
def change_password():
    cursor = None
    try:
        data = request.json
        identifier = data.get("identifier")
        current_password = data.get("currentPassword")
        new_password = data.get("newPassword")

        if not identifier or not current_password or not new_password:
            return jsonify({"success": False, "error": "All fields are required."}), 400

        field = "email" if is_email(identifier) else "phone" if is_phone(identifier) else None
        if not field:
            return jsonify({"success": False, "error": "Invalid email or phone number."}), 400

        if not validate_password(new_password):
            return jsonify({"success": False, "error": "New password must be at least 6 characters."}), 400

        cursor = db.cursor(dictionary=True)
        cursor.execute(f"SELECT * FROM users WHERE {field} = %s AND password = %s", (identifier, current_password))
        if not cursor.fetchone():
            return jsonify({"success": False, "error": "Current password is incorrect."}), 401

        cursor.execute(f"UPDATE users SET password = %s WHERE {field} = %s", (new_password, identifier))
        db.commit()
        logger.info(f"Password changed for {field}: {identifier}")
        return jsonify({"success": True, "message": "Password changed successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error in change_password: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/flight_bookings", methods=["GET"])
def get_flight_bookings():
    cursor = None
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"success": False, "error": "User ID is required."}), 400

        cursor = db.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT booking_id, flight_number, airline, from_city, from_state, to_city, to_state, 
                   departure_date, departure_time, arrival_date, arrival_time, 
                   departure_airport, arrival_airport, cost, status
            FROM flight_bookings
            WHERE user_id = %s
            ORDER BY departure_date DESC
            """,
            (user_id,)
        )
        bookings = cursor.fetchall()
        for booking in bookings:
            booking['cost'] = float(booking['cost'])
            # Ensure times are strings
            booking['departure_time'] = str(booking['departure_time']) if booking['departure_time'] else None
            booking['arrival_time'] = str(booking['arrival_time']) if booking['arrival_time'] else None
        logger.info(f"Fetched flight bookings for user_id: {user_id}")
        return jsonify({"success": True, "bookings": bookings}), 200

    except Exception as e:
        logger.error(f"Error fetching flight bookings: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/hotel_bookings", methods=["GET"])
def get_hotel_bookings():
    cursor = None
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"success": False, "error": "User ID is required."}), 400

        cursor = db.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT booking_id, hotel_name, city, state, check_in_date, check_in_time, 
                   check_out_date, check_out_time, cost, status
            FROM hotel_bookings
            WHERE user_id = %s
            ORDER BY check_in_date DESC
            """,
            (user_id,)
        )
        bookings = cursor.fetchall()
        for booking in bookings:
            booking['cost'] = float(booking['cost'])
            # Convert times to strings
            booking['check_in_time'] = str(booking['check_in_time']) if booking['check_in_time'] else None
            booking['check_out_time'] = str(booking['check_out_time']) if booking['check_out_time'] else None
        logger.info(f"Fetched hotel bookings for user_id: {user_id}")
        return jsonify({"success": True, "bookings": bookings}), 200

    except Exception as e:
        logger.error(f"Error fetching hotel bookings: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/car_rentals", methods=["GET"])
def get_car_rentals():
    cursor = None
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"success": False, "error": "User ID is required."}), 400

        cursor = db.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT rental_id, car_name, from_location, to_location, start_date, end_date, cost, status, policy_applied
            FROM car_rentals
            WHERE user_id = %s
            ORDER BY start_date DESC
            """,
            (user_id,)
        )
        rentals = cursor.fetchall()
        for rental in rentals:
            rental['cost'] = float(rental['cost'])
        logger.info(f"Fetched car rentals for user_id: {user_id}")
        return jsonify({"success": True, "bookings": rentals}), 200

    except Exception as e:
        logger.error(f"Error fetching car rentals: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/complete_flight", methods=["POST"])
def complete_flight():
    cursor = None
    try:
        data = request.json
        booking_id = data.get("booking_id")
        if not booking_id:
            return jsonify({"success": False, "error": "Booking ID is required."}), 400

        cursor = db.cursor()
        cursor.execute("SELECT status FROM flight_bookings WHERE booking_id = %s", (booking_id,))
        booking = cursor.fetchone()
        if not booking:
            return jsonify({"success": False, "error": "Flight booking not found."}), 404
        if booking[0] not in ["Pending"]:
            return jsonify({"success": False, "error": "Only Pending flights can be marked as completed."}), 400

        cursor.execute("UPDATE flight_bookings SET status = 'Completed' WHERE booking_id = %s", (booking_id,))
        db.commit()
        logger.info(f"Flight booking {booking_id} marked as completed")
        return jsonify({"success": True, "message": "Flight marked as completed successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error completing flight: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/cancel_flight", methods=["POST"])
def cancel_flight():
    cursor = None
    try:
        data = request.json
        booking_id = data.get("booking_id")
        if not booking_id:
            return jsonify({"success": False, "error": "Booking ID is required."}), 400

        cursor = db.cursor()
        cursor.execute("SELECT status FROM flight_bookings WHERE booking_id = %s", (booking_id,))
        booking = cursor.fetchone()
        if not booking:
            return jsonify({"success": False, "error": "Flight booking not found."}), 404
        if booking[0] not in ["Upcoming", "Pending"]:
            return jsonify({"success": False, "error": "Only Upcoming or Pending flights can be cancelled."}), 400

        cursor.execute("UPDATE flight_bookings SET status = 'Cancelled' WHERE booking_id = %s", (booking_id,))
        db.commit()
        logger.info(f"Flight booking {booking_id} cancelled")
        return jsonify({"success": True, "message": "Flight cancelled successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error cancelling flight: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/complete_hotel", methods=["POST"])
def complete_hotel():
    cursor = None
    try:
        data = request.json
        booking_id = data.get("booking_id")
        if not booking_id:
            return jsonify({"success": False, "error": "Booking ID is required."}), 400

        cursor = db.cursor()
        cursor.execute("SELECT status FROM hotel_bookings WHERE booking_id = %s", (booking_id,))
        booking = cursor.fetchone()
        if not booking:
            return jsonify({"success": False, "error": "Hotel booking not found."}), 404
        if booking[0] not in ["Pending"]:
            return jsonify({"success": False, "error": "Only Pending hotels can be marked as completed."}), 400

        cursor.execute("UPDATE hotel_bookings SET status = 'Completed' WHERE booking_id = %s", (booking_id,))
        db.commit()
        logger.info(f"Hotel booking {booking_id} marked as completed")
        return jsonify({"success": True, "message": "Hotel booking marked as completed successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error completing hotel: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/cancel_hotel", methods=["POST"])
def cancel_hotel():
    cursor = None
    try:
        data = request.json
        booking_id = data.get("booking_id")
        if not booking_id:
            return jsonify({"success": False, "error": "Booking ID is required."}), 400

        cursor = db.cursor()
        cursor.execute("SELECT status FROM hotel_bookings WHERE booking_id = %s", (booking_id,))
        booking = cursor.fetchone()
        if not booking:
            return jsonify({"success": False, "error": "Hotel booking not found."}), 404
        if booking[0] not in ["Upcoming", "Pending"]:
            return jsonify({"success": False, "error": "Only Upcoming or Pending hotels can be cancelled."}), 400

        cursor.execute("UPDATE hotel_bookings SET status = 'Cancelled' WHERE booking_id = %s", (booking_id,))
        db.commit()
        logger.info(f"Hotel booking {booking_id} cancelled")
        return jsonify({"success": True, "message": "Hotel booking cancelled successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error cancelling hotel: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/complete_car", methods=["POST"])
def complete_car():
    cursor = None
    try:
        data = request.json
        rental_id = data.get("rental_id")
        if not rental_id:
            return jsonify({"success": False, "error": "Rental ID is required."}), 400

        cursor = db.cursor()
        cursor.execute("SELECT status FROM car_rentals WHERE rental_id = %s", (rental_id,))
        rental = cursor.fetchone()
        if not rental:
            return jsonify({"success": False, "error": "Car rental not found."}), 404
        if rental[0] not in ["Pending"]:
            return jsonify({"success": False, "error": "Only Pending car rentals can be marked as completed."}), 400

        cursor.execute("UPDATE car_rentals SET status = 'Completed' WHERE rental_id = %s", (rental_id,))
        db.commit()
        logger.info(f"Car rental {rental_id} marked as completed")
        return jsonify({"success": True, "message": "Car rental marked as completed successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error completing car rental: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/api/cancel_car", methods=["POST"])
def cancel_car():
    cursor = None
    try:
        data = request.json
        rental_id = data.get("rental_id")
        if not rental_id:
            return jsonify({"success": False, "error": "Rental ID is required."}), 400

        cursor = db.cursor()
        cursor.execute("SELECT status FROM car_rentals WHERE rental_id = %s", (rental_id,))
        rental = cursor.fetchone()
        if not rental:
            return jsonify({"success": False, "error": "Car rental not found."}), 404
        if rental[0] not in ["Upcoming", "Pending"]:
            return jsonify({"success": False, "error": "Only Upcoming or Pending car rentals can be cancelled."}), 400

        cursor.execute("UPDATE car_rentals SET status = 'Cancelled' WHERE rental_id = %s", (rental_id,))
        db.commit()
        logger.info(f"Car rental {rental_id} cancelled")
        return jsonify({"success": True, "message": "Car rental cancelled successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error cancelling car rental: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500
    finally:
        if cursor:
            cursor.close()

if __name__ == "__main__":
    server = Server(app.wsgi_app)
    server.watch('*.py')
    server.serve(host='0.0.0.0', port=5000, debug=True)