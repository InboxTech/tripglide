from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import mysql.connector
import re
import logging
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from livereload import Server  # Import livereload
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow React frontend

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# MySQL Connection
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # Replace with your MySQL password
        database="tripglide"
    )
    logger.info("Database connection established successfully")
except mysql.connector.Error as e:
    logger.error(f"Failed to connect to database: {str(e)}")
    raise

load_dotenv()

# Access the variables
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_VERIFY_SERVICE_SID = os.getenv('TWILIO_VERIFY_SERVICE_SID')

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

# Reset Server State
@app.route("/api/reset", methods=["POST"])
def reset():
    try:
        logger.info("Server state reset successfully. Ready for new user entry.")
        return jsonify({"success": True, "message": "Server state reset successfully"}), 200
    except Exception as e:
        logger.error(f"Error resetting server state: {str(e)}")
        return jsonify({"success": False, "error": "Server error during reset"}), 500

# Signup Route
@app.route("/api/signup", methods=["POST"])
def signup():
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
            cursor.close()
            return jsonify({"success": False, "error": "User already exists."}), 409

        cursor.execute(
            f"INSERT INTO users ({field}, password, username, gender) VALUES (%s, %s, %s, %s)",
            (identifier, password, "NewUser", "Unknown")
        )
        db.commit()
        cursor.close()
        logger.info(f"User signed up with {field}: {identifier}")
        return jsonify({"success": True, "message": "User registered successfully! Please log in."}), 201

    except Exception as e:
        db.rollback()
        logger.error(f"Error in signup: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

# Login Route
@app.route("/api/login", methods=["POST"])
def login():
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
            cursor.close()
            return jsonify({"success": False, "error": "Invalid credentials"}), 401

        if field == "phone" and not user["phone_verified"]:
            send_verification(identifier, channel='sms')
            cursor.close()
            return jsonify({"success": False, "requires_verification": True, "message": "Please verify your phone.", "identifier": identifier, "type": "phone"}), 200
        elif field == "email" and not user["email_verified"]:
            send_verification(identifier, channel='email')
            cursor.close()
            return jsonify({"success": False, "requires_verification": True, "message": "Please verify your email.", "identifier": identifier, "type": "email"}), 200

        user_data = {k: v for k, v in user.items() if k != "password"}
        cursor.close()
        logger.info(f"User logged in with {field}: {identifier}")
        return jsonify({"success": True, "user": user_data}), 200

    except Exception as e:
        logger.error(f"Error in login: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

# Verify Code
@app.route("/api/verify_code", methods=["POST"])
def verify_code_route():
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
            cursor.close()
            logger.info(f"{field.split('_')[0].capitalize()} verified for {identifier}")
            return jsonify({"success": True, "message": f"{field.split('_')[0].capitalize()} verified successfully! Please log in again."}), 200
        else:
            return jsonify({"success": False, "error": "Invalid or expired verification code."}), 400

    except Exception as e:
        db.rollback()
        logger.error(f"Error in verify_code: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

# Request Verification Code
@app.route("/api/request_verification", methods=["POST"])
def request_verification():
    try:
        data = request.json
        identifier = data.get("identifier")

        if not identifier or not is_phone(identifier):
            return jsonify({"success": False, "error": "Valid phone number is required."}), 400

        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE phone = %s", (identifier,))
        user = cursor.fetchone()
        if not user:
            cursor.close()
            return jsonify({"success": False, "error": "User not found."}), 404

        if user["phone_verified"]:
            cursor.close()
            return jsonify({"success": False, "error": "Phone already verified."}), 400

        verification_sid = send_verification(identifier, channel='sms')
        cursor.close()
        return jsonify({"success": True, "message": "Verification code sent to phone.", "sid": verification_sid}), 200

    except Exception as e:
        logger.error(f"Error in request_verification: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

# Get User Profile
@app.route("/api/profile", methods=["GET"])
def get_profile():
    try:
        identifier = request.args.get("identifier")
        if not identifier:
            return jsonify({"success": False, "error": "Identifier is required."}), 400

        cursor = db.cursor(dictionary=True)
        field = "email" if is_email(identifier) else "phone" if is_phone(identifier) else None
        if not field:
            cursor.close()
            return jsonify({"success": False, "error": "Invalid email or phone number."}), 400

        cursor.execute(f"SELECT * FROM users WHERE {field} = %s", (identifier,))
        user = cursor.fetchone()
        if user:
            user_data = {k: v for k, v in user.items() if k != "password"}
            cursor.close()
            return jsonify({"success": True, "user": user_data}), 200
        else:
            cursor.close()
            return jsonify({"success": False, "error": "User not found."}), 404

    except Exception as e:
        logger.error(f"Error in get_profile: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

# Update Profile
@app.route("/api/update_profile", methods=["POST"])
def update_profile():
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
        cursor.close()
        logger.info(f"Profile updated for {field}: {identifier}")
        return jsonify({"success": True, "message": "Profile updated successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error in update_profile: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

# Change Password
@app.route("/api/change_password", methods=["POST"])
def change_password():
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
            cursor.close()
            return jsonify({"success": False, "error": "Current password is incorrect."}), 401

        cursor.execute(f"UPDATE users SET password = %s WHERE {field} = %s", (new_password, identifier))
        db.commit()
        cursor.close()
        logger.info(f"Password changed for {field}: {identifier}")
        return jsonify({"success": True, "message": "Password changed successfully!"}), 200

    except Exception as e:
        db.rollback()
        logger.error(f"Error in change_password: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

# Get Flight Bookings
@app.route("/api/flight_bookings", methods=["GET"])
def get_flight_bookings():
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"success": False, "error": "User ID is required."}), 400

        cursor = db.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT booking_id, from_city, to_city, departure_date, cost, status
            FROM flight_bookings
            WHERE user_id = %s
            ORDER BY departure_date DESC
            """,
            (user_id,)
        )
        bookings = cursor.fetchall()
        # Convert cost to float for each booking
        for booking in bookings:
            booking['cost'] = float(booking['cost'])
        cursor.close()
        logger.info(f"Fetched flight bookings for user_id: {user_id}")
        return jsonify({"success": True, "bookings": bookings}), 200

    except Exception as e:
        logger.error(f"Error fetching flight bookings: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

# Get Hotel Bookings
@app.route("/api/hotel_bookings", methods=["GET"])
def get_hotel_bookings():
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"success": False, "error": "User ID is required."}), 400

        cursor = db.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT booking_id, hotel_name, check_in_date, check_out_date, cost, status
            FROM hotel_bookings
            WHERE user_id = %s
            ORDER BY check_in_date DESC
            """,
            (user_id,)
        )
        bookings = cursor.fetchall()
        # Convert cost to float for each booking
        for booking in bookings:
            booking['cost'] = float(booking['cost'])
        cursor.close()
        logger.info(f"Fetched hotel bookings for user_id: {user_id}")
        return jsonify({"success": True, "bookings": bookings}), 200

    except Exception as e:
        logger.error(f"Error fetching hotel bookings: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

# Get Car Rentals
@app.route("/api/car_rentals", methods=["GET"])
def get_car_rentals():
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"success": False, "error": "User ID is required."}), 400

        cursor = db.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT rental_id, car_name, start_date, end_date, cost, status
            FROM car_rentals
            WHERE user_id = %s
            ORDER BY start_date DESC
            """,
            (user_id,)
        )
        rentals = cursor.fetchall()
        # Convert cost to float for each rental
        for rental in rentals:
            rental['cost'] = float(rental['cost'])
        cursor.close()
        logger.info(f"Fetched car rentals for user_id: {user_id}")
        return jsonify({"success": True, "bookings": rentals}), 200

    except Exception as e:
        logger.error(f"Error fetching car rentals: {str(e)}")
        return jsonify({"success": False, "error": "Server error. Please try again."}), 500

if __name__ == "__main__":
    # Use livereload instead of app.run
    server = Server(app.wsgi_app)
    server.watch('*.py')  # Watch all Python files for changes
    server.serve(host='0.0.0.0', port=5000, debug=True)