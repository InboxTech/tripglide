# Import necessary APIs in one API
from flask import Flask, jsonify, request
import mysql.connector
# from dotenv import load_dotenv
import os
from flask_cors import CORS
import stripe  # Added Stripe import

# load_dotenv()
app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Set your Stripe secret key
stripe.api_key = "sk_test_51RA1PaAGhuxmwIzwXzYwMTfttf8AeMgBoHagWerfMXYHkITFhxL2gZlskFnv5uufbtLaXervlD2CRfDnG57KMSEK00VE1xcXDW"  # Replace with your Stripe Secret Key

# Access environment variables
# stripe_key = os.getenv("sk_test_51RA1PaAGhuxmwIzwXzYwMTfttf8AeMgBoHagWerfMXYHkITFhxL2gZlskFnv5uufbtLaXervlD2CRfDnG57KMSEK00VE1xcXDW")
# db_url = os.getenv("http://127.0.0.1:5001")
debug_mode = os.getenv("DEBUG") == "True"

# MySQL connection function
def get_db_connection():
    try:
        return mysql.connector.connect(
            host='localhost',
            user='root',  # Update with your MySQL username
            password='',  # Update with your MySQL password
            port="3307",  # Update if different
            database='tripglide'  # Update with your actual database name
        )
    except mysql.connector.Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# General function to fetch data
def fetch_data(query, params=None):
    connection = get_db_connection()
    if connection is None:
        return None, "Database connection failed"

    cursor = connection.cursor(dictionary=True)
    try:
        # Execute parameterized query properly
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

# ✅ New Endpoint to Fetch Locations
@app.route('/locations', methods=['GET'])
def get_locations():
    query = "SELECT DISTINCT City FROM cars ORDER BY City ASC"
    location_data, error = fetch_data(query)

    if error:
        return jsonify({"error": error}), 500

    # Format locations as a list
    locations = [row['City'] for row in location_data if row.get('City')]
    return jsonify({"locations": locations})

# ✅ Combined API to handle multiple queries
@app.route('/', methods=['GET'])
def get_data():
    # Get all query parameters
    location = request.args.get('location')
    no_of_passengers = request.args.get('no_of_passenger')
    car_type = request.args.get('cartype')
    make = request.args.get('make')
    model = request.args.get('model')
    fuel_policy = request.args.get('fuel_policy')
    transmission = request.args.get('transmission')
    price = request.args.get('price')
    agency = request.args.get('agency')
    ratings = request.args.get('ratings')
    
    # Build dynamic query based on available params
    query_conditions = []
    query_params = []

    if location:
        query_conditions.append("City = %s")
        query_params.append(location)
    if no_of_passengers:
        query_conditions.append("no_of_passengers = %s")
        query_params.append(no_of_passengers)    
    if car_type:
        query_conditions.append("cartype = %s")
        query_params.append(car_type)
    if make:
        query_conditions.append("make = %s")
        query_params.append(make)
    if model:
        query_conditions.append("model = %s")
        query_params.append(model)
    if fuel_policy:
        query_conditions.append("fuel_policy = %s")
        query_params.append(fuel_policy)
    if transmission:
        query_conditions.append("transmission = %s")
        query_params.append(transmission)
    if price:
        query_conditions.append("price = %s")
        query_params.append(price)
    if agency:
        query_conditions.append("agency = %s")
        query_params.append(agency)
    if ratings:
        query_conditions.append("ratings = %s")
        query_params.append(ratings)
    
    # Create final query dynamically
    base_query = "SELECT * FROM cars"
    if query_conditions:
        base_query += " WHERE " + " AND ".join(query_conditions)

    # Fetch cars based on dynamic query
    car_data, error = fetch_data(base_query, tuple(query_params))
    if error:
        return jsonify({"error": error}), 500

    # ✅ Format car data response
    formatted_response = []
    if car_data:
        for row in car_data:
            formatted_response.append({
                "location": row["City"],  # Corrected
                "no_of_passengers": row["Seats"],
                "cartype": row.get("CarType", "N/A"),  # Corrected
                "make": row["Make"],
                "model": row["Model"],  # Corrected
                "fuel_policy": row["Fuel_Policy"],  # Corrected
                "transmission": row["Transmission"],  # Corrected
                "price": row["Price_Per_Hour_INR"],
                "agency": row["Agency"],  # Corrected
                "price_per_hour": row["Price_Per_Hour_INR"],  # Corrected
                "Car-ID": row.get("CarID", "N/A"),  # No address column, using LocationID if needed
                "ratings": row.get("Ratings", "N/A"),
                "ac": row.get("AC", "N/A")
            })
            
    return jsonify(formatted_response)

# ✅ Stripe Checkout Session Endpoint (Added from Step 2)
@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        # Create a Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Sample Product',
                    },
                    'unit_amount': 2000,  # Amount in cents ($20.00)
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:5173/success',  # Redirect after success
            cancel_url='http://localhost:5173/cancel',    # Redirect after cancel
        )
        return jsonify({'id': session.id})
    except Exception as e:
        return jsonify(error=str(e)), 403

# Run the Flask app and print data in the console
if __name__ == '__main__':
    app.run(debug=debug_mode, port=5001)




# # Import necessary APIs in one API
# from flask import Flask, jsonify, request
# import mysql.connector
# # from dotenv import load_dotenv
# import os
# from flask_cors import CORS
# import stripe  # Added Stripe import

# # load_dotenv()
# app = Flask(__name__)
# CORS(app)  # Enable CORS for all domains

# # Set your Stripe secret key
# stripe.api_key = "sk_test_51RA1PaAGhuxmwIzwXzYwMTfttf8AeMgBoHagWerfMXYHkITFhxL2gZlskFnv5uufbtLaXervlD2CRfDnG57KMSEK00VE1xcXDW"  # Replace with your Stripe Secret Key

# # Access environment variables
# # stripe_key = os.getenv("sk_test_51RA1PaAGhuxmwIzwXzYwMTfttf8AeMgBoHagWerfMXYHkITFhxL2gZlskFnv5uufbtLaXervlD2CRfDnG57KMSEK00VE1xcXDW")
# # db_url = os.getenv("http://127.0.0.1:5001")
# debug_mode = os.getenv("DEBUG") == "True"

# # MySQL connection function
# def get_db_connection():
#     try:
#         return mysql.connector.connect(
#             host='localhost',
#             user='root',  # Update with your MySQL username
#             password='',  # Update with your MySQL password
#             port="3307",  # Update if different
#             database='tripglide'  # Update with your actual database name
#         )
#     except mysql.connector.Error as e:
#         print(f"Error connecting to MySQL: {e}")
#         return None

# # General function to fetch data
# def fetch_data(query, params=None):
#     connection = get_db_connection()
#     if connection is None:
#         return None, "Database connection failed"

#     cursor = connection.cursor(dictionary=True)
#     try:
#         # Execute parameterized query properly
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

# # ✅ New Endpoint to Fetch Locations
# @app.route('/locations', methods=['GET'])
# def get_locations():
#     query = "SELECT DISTINCT City FROM cars ORDER BY City ASC"
#     location_data, error = fetch_data(query)

#     if error:
#         return jsonify({"error": error}), 500

#     # Format locations as a list
#     locations = [row['City'] for row in location_data if row.get('City')]
#     return jsonify({"locations": locations})

# # ✅ Combined API to handle multiple queries
# @app.route('/', methods=['GET'])
# def get_data():
#     # Get all query parameters
#     location = request.args.get('location')
#     no_of_passengers = request.args.get('no_of_passenger')
#     car_type = request.args.get('cartype')
#     make = request.args.get('make')
#     model = request.args.get('model')
#     fuel_policy = request.args.get('fuel_policy')
#     transmission = request.args.get('transmission')
#     price = request.args.get('price')
#     agency = request.args.get('agency')
#     ratings = request.args.get('ratings')
    
#     # Build dynamic query based on available params
#     query_conditions = []
#     query_params = []

#     if location:
#         query_conditions.append("City = %s")
#         query_params.append(location)
#     if no_of_passengers:
#         query_conditions.append("no_of_passengers = %s")
#         query_params.append(no_of_passengers)    
#     if car_type:
#         query_conditions.append("cartype = %s")
#         query_params.append(car_type)
#     if make:
#         query_conditions.append("make = %s")
#         query_params.append(make)
#     if model:
#         query_conditions.append("model = %s")
#         query_params.append(model)
#     if fuel_policy:
#         query_conditions.append("fuel_policy = %s")
#         query_params.append(fuel_policy)
#     if transmission:
#         query_conditions.append("transmission = %s")
#         query_params.append(transmission)
#     if price:
#         query_conditions.append("price = %s")
#         query_params.append(price)
#     if agency:
#         query_conditions.append("agency = %s")
#         query_params.append(agency)
#     if ratings:
#         query_conditions.append("ratings = %s")
#         query_params.append(ratings)
    
#     # Create final query dynamically
#     base_query = "SELECT * FROM cars"
#     if query_conditions:
#         base_query += " WHERE " + " AND ".join(query_conditions)

#     # Fetch cars based on dynamic query
#     car_data, error = fetch_data(base_query, tuple(query_params))
#     if error:
#         return jsonify({"error": error}), 500

#     # ✅ Format car data response
#     formatted_response = []
#     if car_data:
#         for row in car_data:
#             formatted_response.append({
#                 "location": row["City"],  # Corrected
#                 "no_of_passengers": row["Seats"],
#                 "cartype": row.get("CarType", "N/A"),  # Corrected
#                 "make": row["Make"],
#                 "model": row["Model"],  # Corrected
#                 "fuel_policy": row["Fuel_Policy"],  # Corrected
#                 "transmission": row["Transmission"],  # Corrected
#                 "price": row["Price_Per_Hour_INR"],
#                 "agency": row["Agency"],  # Corrected
#                 "price_per_hour": row["Price_Per_Hour_INR"],  # Corrected
#                 "Car-ID": row.get("CarID", "N/A"),  # No address column, using LocationID if needed
#                 "ratings": row.get("Ratings", "N/A"),
#                 "ac": row.get("AC", "N/A")
#             })
            
#     return jsonify(formatted_response)

# # ✅ Stripe Checkout Session Endpoint (Added from Step 2)
# @app.route('/create-checkout-session', methods=['POST'])
# def create_checkout_session():
#     try:
#         data = request.json
#         # Create a Checkout Session
#         session = stripe.checkout.Session.create(
#             payment_method_types=['card'],
#             line_items=[{
#                 'price_data': {
#                     'currency': 'usd',
#                     'product_data': {
#                         'name': 'Sample Product',
#                     },
#                     'unit_amount': 2000,  # Amount in cents ($20.00)
#                 },
#                 'quantity': 1,
#             }],
#             mode='payment',
#             success_url='http://localhost:3000/success',  # Redirect after success
#             cancel_url='http://localhost:3000/cancel',    # Redirect after cancel
#         )
#         return jsonify({'id': session.id})
#     except Exception as e:
#         return jsonify(error=str(e)), 403

# # Run the Flask app and print data in the console
# if __name__ == '__main__':
#     app.run(debug=debug_mode, port=5001)


# # Import necessary api's in one api
# from flask import Flask, jsonify,request
# import mysql.connector
# # from dotenv import load_dotenv
# import os
# from flask_cors import CORS

# # load_dotenv()
# app = Flask(__name__)
# CORS(app)  # Enable CORS for all domains

# # Access environment variables
# # stripe_key = os.getenv("sk_test_51RA1PaAGhuxmwIzwXzYwMTfttf8AeMgBoHagWerfMXYHkITFhxL2gZlskFnv5uufbtLaXervlD2CRfDnG57KMSEK00VE1xcXDW")
# # db_url = os.getenv("http://127.0.0.1:5001")
# # debug_mode = os.getenv("DEBUG") == "True"

# # MySQL connection function
# def get_db_connection():
#     try:
#         return mysql.connector.connect(
#             host='localhost',
#             user='root',  # Update with your MySQL username
#             password='',  # Update with your MySQL password
#             port="3307",  # Update if different
#             database='tripglide'  # Update with your actual database name
#         )
#     except mysql.connector.Error as e:
#         print(f"Error connecting to MySQL: {e}")
#         return None

# # General function to fetch data
# def fetch_data(query, params=None):
#     connection = get_db_connection()
#     if connection is None:
#         return None, "Database connection failed"

#     cursor = connection.cursor(dictionary=True)
#     try:
#         # Execute parameterized query properly
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

# # ✅ New Endpoint to Fetch Locations
# @app.route('/locations', methods=['GET'])
# def get_locations():
#     query = "SELECT DISTINCT City FROM cars ORDER BY City ASC"
#     location_data, error = fetch_data(query)

#     if error:
#         return jsonify({"error": error}), 500

#     # Format locations as a list
#     locations = [row['City'] for row in location_data if row.get('City')]
#     return jsonify({"locations": locations})

# # ✅ Combined API to handle multiple queries
# @app.route('/', methods=['GET'])
# def get_data():
#     # Get all query parameters
#     location = request.args.get('location')
#     no_of_passengers = request.args.get('no_of_passenger')
#     car_type = request.args.get('cartype')
#     make = request.args.get('make')
#     model = request.args.get('model')
#     fuel_policy = request.args.get('fuel_policy')
#     transmission = request.args.get('transmission')
#     price = request.args.get('price')
#     agency = request.args.get('agency')
#     ratings = request.args.get('ratings')
    

#     # Build dynamic query based on available params
#     query_conditions = []
#     query_params = []

#     if location:
#         query_conditions.append("City = %s")
#         query_params.append(location)
#     if no_of_passengers:
#         query_conditions.append("no_of_passengers = %s")
#         query_params.append(no_of_passengers)    
#     if car_type:
#         query_conditions.append("cartype = %s")
#         query_params.append(car_type)
#     if make:
#         query_conditions.append("make = %s")
#         query_params.append(make)
#     if model:
#         query_conditions.append("model = %s")
#         query_params.append(model)
#     if fuel_policy:
#         query_conditions.append("fuel_policy = %s")
#         query_params.append(fuel_policy)
#     if transmission:
#         query_conditions.append("transmission = %s")
#         query_params.append(transmission)
#     if price:
#         query_conditions.append("price = %s")
#         query_params.append(price)
#     if agency:
#         query_conditions.append("agency = %s")
#         query_params.append(agency)
#     if ratings:
#         query_conditions.append("ratings = %s")
#         query_params.append(ratings)
    

#     # Create final query dynamically
#     base_query = "SELECT * FROM cars"
#     if query_conditions:
#         base_query += " WHERE " + " AND ".join(query_conditions)

#     # Fetch cars based on dynamic query
#     car_data, error = fetch_data(base_query, tuple(query_params))
#     if error:
#         return jsonify({"error": error}), 500

#     # ✅ Format car data response
#     formatted_response = []
#     if car_data:
#         for row in car_data:
#             formatted_response.append({
#                 "location": row["City"],  # Corrected
#                 "no_of_passengers": row["Seats"],
#                 "cartype": row.get("CarType", "N/A"),  # Corrected
#                 "make": row["Make"],
#                 "model": row["Model"],  # Corrected
#                 "fuel_policy": row["Fuel_Policy"],  # Corrected
#                 "transmission": row["Transmission"],  # Corrected
#                 "price": row["Price_Per_Hour_INR"],
#                 "agency": row["Agency"],  # Corrected
#                 "price_per_hour": row["Price_Per_Hour_INR"],  # Corrected
#                 "Car-ID": row.get("CarID", "N/A"),  # No address column, using LocationID if needed
#                 "ratings": row.get("Ratings", "N/A"),
#                 "ac": row.get("AC", "N/A")
#             })
            
#     return jsonify(formatted_response)
#     # return f"Stripe Key: {pk_test_51RA1PaAGhuxmwIzwuekZ7LyLuwOFMdNXMGBGdVj7tO603Bz6Rq0lzHf51iuXuc6wJHCQIguaKycDVvzfhOx6gCxM00JF5p3CdX}, DB URL: {http://127.0.0.1:5001/}, Debug: {debug_mode}"

# # Run the Flask app and print data in the console
# if __name__ == '__main__':
#     app.run(debug=debug_mode, port=5001)





# #frontend conn
# from flask import Flask, jsonify,request
# import mysql.connector
# from flask_cors import CORS
# from datetime import timedelta

# app = Flask(__name__)
# CORS(app) # Enable CORS for all domains

# # MySQL connection function
# def get_db_connection():
#     try:
#         return mysql.connector.connect(
#         host='localhost',
#         user='root',  # Update with your MySQL username
#         password='',  # Update with your MySQL password
#         port="3307",  # Update the port if different
#         database='tripglide'  # Update with your actual database name
#     )
#     except mysql.connector.Error as e:
#         print(f"Error connecting to MySQL: {e}")
#         return None
        
# # General function to fetch data
# def fetch_data(query, params=None):
#     connection = get_db_connection()
#     if connection is None:
#         return None, "Database connection failed"

#     cursor = connection.cursor(dictionary=True)
#     try:
#         # Use parameterized query properly
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
        
# # API endpoint to fetch cars data(cartype,model)
# @app.route('/', methods=['GET'])
# def get_data():
#     # Get location from query parameters
#     location = request.args.get('location')

#     # Debug log to check if location is received
#     print(f"Received location: {location}")

#     if not location:
#         return jsonify({"error": "Location is required"}), 400

#     # Fetch cars based on the selected location
#     car_data, error = fetch_data("SELECT * FROM cars WHERE City= %s", (location,))
#     # print(len(car_data))
#     if error:
#         return jsonify({"error": error}), 500

#     # Fetch unique car types and models based on the selected location
#     car_type_model, error = fetch_data("SELECT DISTINCT cartype, model FROM cars WHERE City = %s", (location,))
#     # print(len(car_type_model))
#     if error:
#         return jsonify({"error": error}), 500

#     # ✅ Modify the car_type_model list for a cleaner response
#     formatted_car_type_model = []
#     if car_type_model:
#         for row in car_type_model:
#             formatted_car_type_model.append({
#                 "cartype": row["cartype"],
#                 "model": row["model"]
#             })
#     return jsonify(formatted_car_type_model)       
    

# # ✅ API: Fetch locations
# @app.route('/location', methods=['GET'])
# def get_cities():
#     connection = get_db_connection()
#     if connection is None:
#         return jsonify({"error": "Database connection failed"}), 500

#     cursor = connection.cursor(dictionary=True)
#     try:
#         # Fetch unique cars
#         cursor.execute("SELECT DISTINCT city FROM cars")
#         car_city = [row["city"] for row in cursor.fetchall()]

#         return jsonify({
#             "car_city": car_city if car_city else [],
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)})
#     finally:
#         cursor.close()
#         connection.close()

# # ✅ API: Fetch fuel policies
# @app.route('/fuel', methods=['GET'])
# def get_fuel():
#     connection = get_db_connection()
#     if connection is None:
#         return jsonify({"error": "Database connection failed"}), 500

#     cursor = connection.cursor(dictionary=True)
#     try:
#         # Fetch unique cars
#         cursor.execute("SELECT DISTINCT fuel_policy FROM cars")
#         car_fuel = [row["fuel_policy"] for row in cursor.fetchall()]

#         return jsonify({
#             "car_fuel": car_fuel if car_fuel else [],
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)})
#     finally:
#         cursor.close()
#         connection.close()

# # ✅ API: Fetch transmission
# @app.route('/transmission', methods=['GET'])
# def get_transmission():
#     connection = get_db_connection()
#     if connection is None:
#         return jsonify({"error": "Database connection failed"}), 500

#     cursor = connection.cursor(dictionary=True)
#     try:
#         # Fetch unique cars
#         cursor.execute("SELECT DISTINCT transmission FROM cars")
#         car_trans = [row["transmission"] for row in cursor.fetchall()]

#         return jsonify({
#             "car_trans": car_trans if car_trans else [],
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)})
#     finally:
#         cursor.close()
#         connection.close()

# # ✅ API: Fetch unique price
# @app.route('/price', methods=['GET'])
# def get_price():
#     connection = get_db_connection()
#     if connection is None:
#         return jsonify({"error": "Database connection failed"}), 500

#     cursor = connection.cursor(dictionary=True)
#     try:
#         # Fetch unique cars
#         cursor.execute("SELECT DISTINCT price_per_hour_inr FROM cars")
#         car_price = [row["price_per_hour_inr"] for row in cursor.fetchall()]

#         return jsonify({
#             "car_price": car_price if car_price else [],
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)})
#     finally:
#         cursor.close()
#         connection.close()        

# # ✅ API: Fetch agency
# @app.route('/agency', methods=['GET'])
# def get_agency():
#     connection = get_db_connection()
#     if connection is None:
#         return jsonify({"error": "Database connection failed"}), 500

#     cursor = connection.cursor(dictionary=True)
#     try:
#         # Fetch unique cars
#         cursor.execute("SELECT DISTINCT agency FROM cars")
#         car_agency = [row["agency"] for row in cursor.fetchall()]

#         return jsonify({
#             "car_agency": car_agency if car_agency else [],
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)})
#     finally:
#         cursor.close()
#         connection.close() 

# # ✅ API: Fetch unique address from location table
# @app.route('/address', methods=['GET'])
# def get_address():
#     connection = get_db_connection()
#     if connection is None:
#         return jsonify({"error": "Database connection failed"}), 500

#     cursor = connection.cursor(dictionary=True)
#     try:
#         # Fetch unique cars
#         cursor.execute("SELECT DISTINCT address FROM locations")
#         car_address = [row["address"] for row in cursor.fetchall()]

#         return jsonify({
#             "car_address": car_address if car_address else [],
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)})
#     finally:
#         cursor.close()
#         connection.close()

# # Run the Flask app and print data in the console
# if __name__ == '__main__':
#     # Run the Flask app to serve data via API
#     app.run(debug=True, port=5001)


##table database- fetch
# from flask import Flask, jsonify
# import mysql.connector
# from flask_cors import CORS
# from datetime import timedelta

# app = Flask(__name__)
# CORS(app) # Enable CORS for all domains

# # MySQL connection function
# def get_db_connection():
#     connection = mysql.connector.connect(
#         host='localhost',
#         user='root',  # Update with your MySQL username
#         password='',  # Update with your MySQL password
#         port="3307",  # Update the port if different
#         database='main'  # Update with your actual database name
#     )
#     return connection

# # Convert timedelta to string format "HH:MM:SS"
# def timedelta_to_str(td):
#     if isinstance(td, timedelta):
#         return str(td)
#     return td

# # Function to fetch and print data from the 'cars' table
# def fetch_cars_data():
#     connection = get_db_connection()
#     cursor = connection.cursor(dictionary=True)
#     cursor.execute('SELECT * FROM cars')  # Fetch data from 'cars' table
#     cars = cursor.fetchall()

#     # Convert timedelta fields to string if needed
#     for car in cars:
#         for key, value in car.items():
#             if isinstance(value, timedelta):
#                 car[key] = timedelta_to_str(value)
#     print("Car Data:", car, "\n")

#     cursor.close()
#     connection.close()
#     return cars

# # Function to fetch and print data from the 'location' table
# def fetch_location_data():
#     connection = get_db_connection()
#     cursor = connection.cursor(dictionary=True)
#     cursor.execute('SELECT * FROM locations')  # Fetch data from 'location' table
#     locations = cursor.fetchall()

#     # Convert timedelta fields to string if needed
#     for location in locations:
#         for key, value in location.items():
#             if isinstance(value, timedelta):
#                 location[key] = timedelta_to_str(value)
#     print("Location Data:", location, "\n")

    
#     cursor.close()
#     connection.close()
#     return locations

# # API endpoint to fetch cars data
# @app.route('/', methods=['GET'])
# def get_cars():
#     try:
#         cars = fetch_cars_data()
#         return jsonify({"success": True, "data": cars}), 200
#     except Exception as e:
#         print(f"Error fetching cars: {e}")
#         return jsonify({"success": False, "error": str(e)}), 500


# # API endpoint to fetch location data
# @app.route('/location', methods=['GET'])
# def get_locations():
#     try:
#         locations = fetch_location_data()
#         return jsonify({"success": True, "data": locations}), 200
#     except Exception as e:
#         print(f"Error fetching locations: {e}")
#         return jsonify({"success": False, "error": str(e)}), 500


# # Health check endpoint
# @app.route('/health', methods=['GET'])
# def health_check():
#     try:
#         connection = get_db_connection()
#         cursor = connection.cursor()
#         cursor.execute("SELECT 1")
#         cursor.close()
#         connection.close()
#         return jsonify({"success": True, "message": "Database connection is fine"})
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500

# # Run the Flask app and print data in the console
# if __name__ == '__main__':
#     # Run the Flask app to serve data via API
#     app.run(debug=True, port=5001)




###two tables fetched:cars and locations
# from flask import Flask, jsonify
# import mysql.connector
# from flask_cors import CORS
# from datetime import timedelta

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all domains

# # MySQL connection function
# def get_db_connection():
#     connection = mysql.connector.connect(
#         host='localhost',
#         user='root',  # Update with your MySQL username
#         password='',  # Update with your MySQL password
#         port="3307",  # Update the port if different
#         database='main'  # Update with your actual database name
#     )
#     return connection

# # Convert timedelta to string format "HH:MM:SS"
# def timedelta_to_str(td):
#     if isinstance(td, timedelta):
#         return str(td)
#     return td

# # Function to fetch and print data from the 'cars' table
# def fetch_cars_data():
#     connection = get_db_connection()
#     cursor = connection.cursor(dictionary=True)
#     cursor.execute('SELECT * FROM cars')  # Fetch data from 'cars' table
#     cars = cursor.fetchall()

#     # Convert timedelta fields to string if needed
#     for car in cars:
#         for key, value in car.items():
#             if isinstance(value, timedelta):
#                 car[key] = timedelta_to_str(value)
#     print("Car Data:", car, "\n")

#     cursor.close()
#     connection.close()
#     return cars

# # Function to fetch and print data from the 'location' table
# def fetch_location_data():
#     connection = get_db_connection()
#     cursor = connection.cursor(dictionary=True)
#     cursor.execute('SELECT * FROM locations')  # Fetch data from 'location' table
#     locations = cursor.fetchall()

#     # Convert timedelta fields to string if needed
#     for location in locations:
#         for key, value in location.items():
#             if isinstance(value, timedelta):
#                 location[key] = timedelta_to_str(value)
#     print("Location Data:", location, "\n")

    
#     cursor.close()
#     connection.close()
#     return locations

# # API endpoint to fetch cars data
# @app.route('/', methods=['GET'])
# def get_cars():
#     cars = fetch_cars_data()
#     return jsonify(cars)

# # API endpoint to fetch location data
# @app.route('/location', methods=['GET'])
# def get_locations():
#     locations = fetch_location_data()
#     return jsonify(locations)

# # Run the Flask app and print data in the console
# if __name__ == '__main__':
#     print("Fetching Cars Data...\n")
#     fetch_cars_data()

#     print("Fetching Location Data...\n")
#     fetch_location_data()

#     # Run the Flask app to serve data via API
#     app.run(debug=True, port=5001)





##car api database
# from flask import Flask, jsonify, request
# import mysql.connector
# from flask_cors import CORS
# from datetime import timedelta

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all domains

# # MySQL connection function
# def get_db_connection():
#     connection = mysql.connector.connect(
#         host='localhost',
#         user='root',  # Update with your MySQL username
#         password='',  # Update with your MySQL password
#         port="3307",  #write these if mysql through port/connection error
#         database='main'  # Update with your actual database name
#     )
#     return connection

# # Convert timedelta to string format "HH:MM:SS"
# def timedelta_to_str(td):
#     if isinstance(td, timedelta):
#         return str(td)
#     return td

# # API endpoint to fetch one-way cars based on search criteria
# @app.route('/', methods=['GET'])
# def get_cars():
#     connection = get_db_connection()
#     cursor = connection.cursor(dictionary=True)
#     cursor.execute('SELECT * FROM cars')  # Replace 'car_oneway' with your actual table name
#     cars = cursor.fetchall()

#     # Convert timedelta fields to string
#     for car in cars:
#         for key, value in car.items():
#             if isinstance(value, timedelta):
#                 car[key] = timedelta_to_str(value)
#         print(car,"\n")
 
#     cursor.close()
#     connection.close()
#     return jsonify(cars)

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)






