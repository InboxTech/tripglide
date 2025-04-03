#frontend conn
from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS
from datetime import timedelta

app = Flask(__name__)
CORS(app) # Enable CORS for all domains

# MySQL connection function
def get_db_connection():
    try:
        return mysql.connector.connect(
        host='localhost',
        user='root',  # Update with your MySQL username
        password='',  # Update with your MySQL password
        # port="3307",  # Update the port if different
        database='main'  # Update with your actual database name
    )
    except mysql.connector.Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# API endpoint to fetch cars data
@app.route('/', methods=['GET'])
def get_data():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM cars")
        data = cursor.fetchall()

        # Fetch unique cars
        cursor.execute("SELECT DISTINCT cartype, model FROM cars")
        car_type_model = cursor.fetchall()
        #car_type_model = [{"cartype": row["cartype"], "model": row["model"]} for row in cursor.fetchall()]
        
        # cursor.execute("SELECT DISTINCT model FROM cars")
        # car_model = [row["model"] for row in cursor.fetchall()]

        return jsonify({
    "car_data": car_type_model if car_type_model else []})
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        connection.close()

# ✅ API: Fetch unique departure & arrival airports
@app.route('/location', methods=['GET'])
def get_cities():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        # Fetch unique cars
        cursor.execute("SELECT DISTINCT city FROM locations")
        car_city = [row["city"] for row in cursor.fetchall()]

        return jsonify({
            "car_city": car_city if car_city else [],
        })
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        connection.close()


# ✅ API: Fetch unique departure & arrival airports
@app.route('/fuel', methods=['GET'])
def get_fuel():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        # Fetch unique cars
        cursor.execute("SELECT DISTINCT fuel_policy FROM cars")
        car_fuel = [row["fuel_policy"] for row in cursor.fetchall()]

        return jsonify({
            "car_fuel": car_fuel if car_fuel else [],
        })
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        connection.close()

# ✅ API: Fetch unique departure & arrival airports
@app.route('/transmission', methods=['GET'])
def get_transmission():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        # Fetch unique cars
        cursor.execute("SELECT DISTINCT transmission FROM cars")
        car_trans = [row["transmission"] for row in cursor.fetchall()]

        return jsonify({
            "car_trans": car_trans if car_trans else [],
        })
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        connection.close()

# ✅ API: Fetch unique price
@app.route('/price', methods=['GET'])
def get_price():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        # Fetch unique cars
        cursor.execute("SELECT DISTINCT price_per_hour_inr FROM cars")
        car_price = [row["price_per_hour_inr"] for row in cursor.fetchall()]

        return jsonify({
            "car_price": car_price if car_price else [],
        })
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        connection.close()        


# ✅ API: Fetch unique departure & arrival airports
@app.route('/agency', methods=['GET'])
def get_agency():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        # Fetch unique cars
        cursor.execute("SELECT DISTINCT agency FROM cars")
        car_agency = [row["agency"] for row in cursor.fetchall()]

        return jsonify({
            "car_agency": car_agency if car_agency else [],
        })
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        connection.close() 

# ✅ API: Fetch unique departure & arrival airports
@app.route('/address', methods=['GET'])
def get_address():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        # Fetch unique cars
        cursor.execute("SELECT DISTINCT address FROM locations")
        car_address = [row["address"] for row in cursor.fetchall()]

        return jsonify({
            "car_address": car_address if car_address else [],
        })
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        connection.close()

# Run the Flask app and print data in the console
if __name__ == '__main__':
    # Run the Flask app to serve data via API
    app.run(debug=True, port=5001)




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






