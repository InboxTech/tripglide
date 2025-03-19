from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS
from datetime import timedelta

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# MySQL connection function
def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',  # Update with your MySQL username
        password='',  # Update with your MySQL password
        port="3307",  # Update the port if different
        database='main'  # Update with your actual database name
    )
    return connection

# Convert timedelta to string format "HH:MM:SS"
def timedelta_to_str(td):
    if isinstance(td, timedelta):
        return str(td)
    return td

# Function to fetch and print data from the 'cars' table
def fetch_cars_data():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM cars')  # Fetch data from 'cars' table
    cars = cursor.fetchall()

    # Convert timedelta fields to string if needed
    for car in cars:
        for key, value in car.items():
            if isinstance(value, timedelta):
                car[key] = timedelta_to_str(value)
    print("Car Data:", car, "\n")

    cursor.close()
    connection.close()
    return cars

# Function to fetch and print data from the 'location' table
def fetch_location_data():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM locations')  # Fetch data from 'location' table
    locations = cursor.fetchall()

    # Convert timedelta fields to string if needed
    for location in locations:
        for key, value in location.items():
            if isinstance(value, timedelta):
                location[key] = timedelta_to_str(value)
    print("Location Data:", location, "\n")

    cursor.close()
    connection.close()
    return locations

# API endpoint to fetch cars data
@app.route('/', methods=['GET'])
def get_cars():
    cars = fetch_cars_data()
    return jsonify(cars)

# API endpoint to fetch location data
@app.route('/location', methods=['GET'])
def get_locations():
    locations = fetch_location_data()
    return jsonify(locations)

# Run the Flask app and print data in the console
if __name__ == '__main__':
    print("Fetching Cars Data...\n")
    fetch_cars_data()

    print("Fetching Location Data...\n")
    fetch_location_data()

    # Run the Flask app to serve data via API
    app.run(debug=True, port=5001)





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






