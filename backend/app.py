# # # Import necessary api's in one api
# # from flask import Flask, jsonify,request
# # import mysql.connector
# # from flask_cors import CORS

# # app = Flask(__name__)
# # CORS(app)  # Enable CORS for all domains

# # # MySQL connection function
# # def get_db_connection():
# #     try:
# #         return mysql.connector.connect(
# #             host='localhost',
# #             user='root',  # Update with your MySQL username
# #             password='',  # Update with your MySQL password
# #             # port="3307",  # Update if different
# #             database='main'  # Update with your actual database name
# #         )
# #     except mysql.connector.Error as e:
# #         print(f"Error connecting to MySQL: {e}")
# #         return None

# # # General function to fetch data
# # def fetch_data(query, params=None):
# #     connection = get_db_connection()
# #     if connection is None:
# #         return None, "Database connection failed"

# #     cursor = connection.cursor(dictionary=True)
# #     try:
# #         # Execute parameterized query properly
# #         if params:
# #             cursor.execute(query, params)
# #         else:
# #             cursor.execute(query)

# #         data = cursor.fetchall()
# #         return data, None

# #     except Exception as e:
# #         return None, str(e)
# #     finally:
# #         cursor.close()
# #         connection.close()

# # # ✅ New Endpoint to Fetch Locations
# # @app.route('/locations', methods=['GET'])
# # def get_locations():
# #     query = "SELECT DISTINCT City FROM cars ORDER BY City ASC"
# #     location_data, error = fetch_data(query)

# #     if error:
# #         return jsonify({"error": error}), 500

# #     # Format locations as a list
# #     locations = [row['City'] for row in location_data if row.get('City')]
# #     return jsonify({"locations": locations})

# # # ✅ Combined API to handle multiple queries
# # @app.route('/', methods=['GET'])
# # def get_data():
# #     # Get all query parameters
# #     location = request.args.get('location')
# #     no_of_passengers = request.args.get('no_of_passenger')
# #     car_type = request.args.get('cartype')
# #     make = request.args.get('make')
# #     model = request.args.get('model')
# #     fuel_policy = request.args.get('fuel_policy')
# #     transmission = request.args.get('transmission')
# #     price = request.args.get('price')
# #     agency = request.args.get('agency')
# #     ratings = request.args.get('ratings')
    

# #     # Build dynamic query based on available params
# #     query_conditions = []
# #     query_params = []

# #     if location:
# #         query_conditions.append("City = %s")
# #         query_params.append(location)
# #     if no_of_passengers:
# #         query_conditions.append("no_of_passengers = %s")
# #         query_params.append(no_of_passengers)    
# #     if car_type:
# #         query_conditions.append("cartype = %s")
# #         query_params.append(car_type)
# #     if make:
# #         query_conditions.append("make = %s")
# #         query_params.append(make)
# #     if model:
# #         query_conditions.append("model = %s")
# #         query_params.append(model)
# #     if fuel_policy:
# #         query_conditions.append("fuel_policy = %s")
# #         query_params.append(fuel_policy)
# #     if transmission:
# #         query_conditions.append("transmission = %s")
# #         query_params.append(transmission)
# #     if price:
# #         query_conditions.append("price = %s")
# #         query_params.append(price)
# #     if agency:
# #         query_conditions.append("agency = %s")
# #         query_params.append(agency)
# #     if ratings:
# #         query_conditions.append("ratings = %s")
# #         query_params.append(ratings)
    

# #     # Create final query dynamically
# #     base_query = "SELECT * FROM cars"
# #     if query_conditions:
# #         base_query += " WHERE " + " AND ".join(query_conditions)

# #     # Fetch cars based on dynamic query
# #     car_data, error = fetch_data(base_query, tuple(query_params))
# #     if error:
# #         return jsonify({"error": error}), 500

# #     # ✅ Format car data response
# #     formatted_response = []
# #     if car_data:
# #         for row in car_data:
# #             formatted_response.append({
# #                 "location": row["City"],  # Corrected
# #                 "no_of_passengers": row["Seats"],
# #                 "cartype": row.get("CarType", "N/A"),  # Corrected
# #                 "make": row["Make"],  # Corrected
# #                 "model": row["Model"],  # Corrected
# #                 "fuel_policy": row["Fuel_Policy"],  # Corrected
# #                 "transmission": row["Transmission"],  # Corrected
# #                 "price": row["Price_Per_Hour_INR"],
# #                 "agency": row["Agency"],  # Corrected
# #                 "price_per_hour": row["Price_Per_Hour_INR"],  # Corrected
# #                 "Car-ID": row.get("CarID", "N/A"),  # No address column, using LocationID if needed
# #                 "ratings": row.get("Ratings", "N/A"),
# #                 "ac": row.get("AC", "N/A")
# #             })
            
# #     return jsonify(formatted_response)

# # # Run the Flask app and print data in the console
# # if __name__ == '__main__':
# #     app.run(debug=True, port=5001)




# from flask import Flask, jsonify, request
# import mysql.connector
# from flask_cors import CORS
# import stripe

# app = Flask(__name__)
# CORS(app)

# stripe.api_key = 'sk_test_51RBq3dPlQbJhRZQuFznwHLWQKdYK7o6ZMRPcykMQJrVT4goDZs056Fjkac47TTzEiuyg0P06VsPQPESvM8fY8MlX00ARWblp0v'

# def get_db_connection():
#     try:
#         return mysql.connector.connect(
#             host='localhost',
#             user='root',
#             password='',
#             database='main'
#         )
#     except mysql.connector.Error as e:
#         print(f"Error connecting to MySQL: {e}")
#         return None

# def fetch_data(query, params=None):
#     connection = get_db_connection()
#     if connection is None:
#         return None, "Database connection failed"
#     cursor = connection.cursor(dictionary=True)
#     try:
#         if params:
#             cursor.execute(query, params)
#         else:
#             cursor.execute(query)
#         data = cursor.fetchall()
#         return data, None
#     except Exception as e:
#         return None, str(e)
#     finally:
#         cursor.close()
#         connection.close()

# @app.route('/locations', methods=['GET'])
# def get_locations():
#     query = "SELECT DISTINCT City FROM cars ORDER BY City ASC"
#     location_data, error = fetch_data(query)
#     if error:
#         return jsonify({"error": error}), 500
#     locations = [row['City'] for row in location_data if row.get('City')]
#     return jsonify({"locations": locations})

# @app.route('/locations/terminals', methods=['GET'])
# def get_terminals():
#     query = "SELECT DISTINCT Name FROM locations ORDER BY Name ASC"  # Assuming a 'locations' table
#     terminal_data, error = fetch_data(query)
#     if error:
#         return jsonify({"error": error}), 500
#     terminals = [row['Name'] for row in terminal_data if row.get('Name')]
#     return jsonify({"terminals": terminals})

# @app.route('/', methods=['GET'])
# def get_data():
#     location = request.args.get('location')
#     no_of_passengers = request.args.get('no_of_passenger')
#     car_type = request.args.get('cartype')
#     transmission = request.args.get('transmission')
#     fuel_policy = request.args.get('fuel_policy')

#     query_conditions = []
#     query_params = []

#     # Mandatory city filter
#     if location:
#         query_conditions.append("City = %s")
#         query_params.append(location)
#     else:
#         return jsonify({"error": "Location is required"}), 400

#     # Optional filters
#     if no_of_passengers:
#         query_conditions.append("Seats >= %s")  # Changed to >= for flexibility
#         query_params.append(no_of_passengers)
#     if car_type:
#         query_conditions.append("CarType = %s")
#         query_params.append(car_type)
#     if transmission:
#         query_conditions.append("Transmission = %s")
#         query_params.append(transmission)
#     if fuel_policy:
#         query_conditions.append("Fuel_Policy = %s")
#         query_params.append(fuel_policy)

#     base_query = "SELECT * FROM cars"
#     if query_conditions:
#         base_query += " WHERE " + " AND ".join(query_conditions)

#     car_data, error = fetch_data(base_query, tuple(query_params))
#     if error:
#         return jsonify({"error": error}), 500

#     formatted_response = []
#     if car_data:
#         for row in car_data:
#             formatted_response.append({
#                 "id": row.get("CarID", "N/A"),
#                 "location": row["City"],
#                 "passengers": row["Seats"],
#                 "type": row.get("CarType", "N/A"),
#                 "make": row["Make"],
#                 "model": row["Model"],
#                 "fuel_policy": row["Fuel_Policy"],
#                 "transmission": row["Transmission"],
#                 "price": row["Price_Per_Hour_INR"],
#                 "agency": row["Agency"],
#                 "ratings": row.get("Ratings", "N/A"),
#                 "ac": row.get("AC", "N/A")
#             })

#     return jsonify(formatted_response)


# @app.route('/create-checkout-session', methods=['POST'])
# def create_checkout_session():
#     try:
#         data = request.get_json()
#         pickup_location = data.get('pickupLocation')
#         pickup_date = data.get('pickupDate')
#         pickup_time = data.get('pickupTime')
#         dropoff_date = data.get('dropoffDate')
#         dropoff_time = data.get('dropoffTime')
#         car_id = data.get('carId')
#         car_make = data.get('carMake')
#         car_model = data.get('carModel')
#         total_price = data.get('totalPrice')
#         agency = data.get('agency')

#         if not total_price or total_price <= 0:
#             return jsonify({'error': 'Invalid total price'}), 400

#         # Convert total_price to paise (Stripe uses smallest currency unit)
#         amount_in_paise = int(float(total_price) * 100)

#         # Create a Stripe Checkout Session
#         session = stripe.checkout.Session.create(
#             payment_method_types=['card'],
#             line_items=[{
#                 'price_data': {
#                     'currency': 'inr',
#                     'product_data': {
#                         'name': f'Car Rental: {car_make} {car_model}',
#                         'description': f'Pickup: {pickup_location} on {pickup_date} {pickup_time}, Dropoff: {dropoff_date} {dropoff_time}',
#                     },
#                     'unit_amount': amount_in_paise,
#                 },
#                 'quantity': 1,
#             }],
#             mode='payment',
#             success_url='http://localhost:5173/booking-confirmed',  # Update to your frontend success page
#             cancel_url='http://localhost:5173/cancel',             # Update to your frontend cancel page
#             metadata={
#                 'car_id': str(car_id),
#                 'pickup_location': pickup_location,
#                 'pickup_date': pickup_date,
#                 'dropoff_date': dropoff_date,
#                 'agency': agency
#             }
#         )

#         # Optionally save booking to database
#         connection = get_db_connection()
#         if connection:
#             cursor = connection.cursor()
#             try:
#                 booking_query = """
#                     INSERT INTO bookings (car_id, pickup_location, pickup_date, dropoff_date, amount, status, stripe_session_id)
#                     VALUES (%s, %s, %s, %s, %s, %s, %s)
#                 """
#                 cursor.execute(booking_query, (car_id, pickup_location, pickup_date, dropoff_date, total_price, 'pending', session.id))
#                 connection.commit()
#             except Exception as e:
#                 connection.rollback()
#                 print(f"Error saving booking: {e}")
#             finally:
#                 cursor.close()
#                 connection.close()

#         return jsonify({'id': session.id})
#     except stripe.error.StripeError as e:
#         return jsonify({'error': str(e)}), 400
#     except Exception as e:
#         print(f"Error creating checkout session: {e}")
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)



from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
import stripe

app = Flask(__name__)
CORS(app)  # Allow your frontend (e.g., http://localhost:5173)

# Set your Stripe secret key
stripe.api_key = 'sk_test_51RBq3dPlQbJhRZQuFznwHLWQKdYK7o6ZMRPcykMQJrVT4goDZs056Fjkac47TTzEiuyg0P06VsPQPESvM8fY8MlX00ARWblp0v'

# MySQL connection function
def get_db_connection():
    try:
        return mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            # port="3307",
            database='main'
        )
    except mysql.connector.Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def fetch_data(query, params=None):
    connection = get_db_connection()
    if connection is None:
        return None, "Database connection failed"
    cursor = connection.cursor(dictionary=True)
    try:
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        data = cursor.fetchall()
        return data, None
    except Exception as e:
        return None, str(e)
    finally:
        cursor.close()
        connection.close()

@app.route('/locations', methods=['GET'])
def get_locations():
    query = "SELECT DISTINCT City FROM cars ORDER BY City ASC"
    location_data, error = fetch_data(query)
    if error:
        return jsonify({"error": error}), 500
    locations = [row['City'] for row in location_data if row.get('City')]
    return jsonify({"locations": locations})

@app.route('/locations/terminals', methods=['GET'])
def get_terminals():
    query = "SELECT DISTINCT Name FROM locations ORDER BY Name ASC"
    terminal_data, error = fetch_data(query)
    if error:
        return jsonify({"error": error}), 500
    terminals = [row['Name'] for row in terminal_data if row.get('Name')]
    return jsonify({"terminals": terminals})

@app.route('/', methods=['GET'])
def get_data():
    location = request.args.get('location')
    no_of_passengers = request.args.get('no_of_passenger')
    car_type = request.args.get('cartype')
    transmission = request.args.get('transmission')
    fuel_policy = request.args.get('fuel_policy')
    make = request.args.get('make')
    price = request.args.get('price')
    agency = request.args.get('agency')
    ratings = request.args.get('ratings')

    query_conditions = []
    query_params = []

    if location:
        query_conditions.append("City = %s")
        query_params.append(location)
    if no_of_passengers:
        query_conditions.append("Seats = %s")
        query_params.append(no_of_passengers)
    if car_type:
        query_conditions.append("CarType = %s")
        query_params.append(car_type)
    if make:
        query_conditions.append("Make = %s")
        query_params.append(make)
    if fuel_policy:
        query_conditions.append("Fuel_Policy = %s")
        query_params.append(fuel_policy)
    if transmission:
        query_conditions.append("Transmission = %s")
        query_params.append(transmission)
    if price:
        query_conditions.append("Price_Per_Hour_INR = %s")
        query_params.append(price)
    if agency:
        query_conditions.append("Agency = %s")
        query_params.append(agency)
    if ratings:
        query_conditions.append("Ratings = %s")
        query_params.append(ratings)

    base_query = "SELECT * FROM cars"
    if query_conditions:
        base_query += " WHERE " + " AND ".join(query_conditions)

    car_data, error = fetch_data(base_query, tuple(query_params))
    if error:
        return jsonify({"error": error}), 500

    formatted_response = []
    if car_data:
        for row in car_data:
            formatted_response.append({
                "id": row.get("CarID", "N/A"),
                "location": row["City"],
                "passengers": row["Seats"],
                "type": row.get("CarType", "N/A"),
                "make": row["Make"],
                "fuel_policy": row["Fuel_Policy"],
                "transmission": row["Transmission"],
                "price": row["Price_Per_Hour_INR"],
                "agency": row["Agency"],
                "ratings": row.get("Ratings", "N/A"),
                "ac": row.get("AC", "N/A"),
                "image": "https://via.placeholder.com/300x200"  # Placeholder image
            })

    return jsonify(formatted_response)

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.get_json()
        pickup_location = data.get('pickupLocation')
        pickup_date = data.get('pickupDate')
        pickup_time = data.get('pickupTime')
        dropoff_date = data.get('dropoffDate')
        dropoff_time = data.get('dropoffTime')
        car_id = data.get('carId')
        car_make = data.get('carMake')
        car_model = data.get('carModel')
        total_price = data.get('amount')  # Expecting amount in paise
        agency = data.get('agency')

        if not total_price or total_price <= 0:
            return jsonify({'error': 'Invalid total price'}), 400

        # Convert total_price to paise if not already (assuming it's in INR)
        amount_in_paise = int(float(total_price))

        # Create a Stripe Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'inr',
                    'product_data': {
                        'name': f'Car Rental: {car_make} {car_model}',
                        'description': f'Pickup: {pickup_location} on {pickup_date} {pickup_time}, Dropoff: {dropoff_date} {dropoff_time}',
                    },
                    'unit_amount': amount_in_paise,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:5173/booking-confirmed',
            cancel_url='http://localhost:5173/cancel',
            metadata={
                'car_id': str(car_id),
                'pickup_location': pickup_location,
                'pickup_date': pickup_date,
                'dropoff_date': dropoff_date,
                'agency': agency
            }
        )


        return jsonify({'id': session.id})
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f"Error creating checkout session: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)