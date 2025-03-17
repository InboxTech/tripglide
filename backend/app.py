from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from datetime import timedelta

app = Flask(_name_)
CORS(app)  # Enable CORS for all domains

# MySQL connection function
def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',  # Update with your MySQL username
        password='',  # Update with your MySQL password
        port="3307",
        database='main'  # Update with your actual database name
    )
    return connection

# Convert timedelta to string format "HH:MM:SS"
def timedelta_to_str(td):
    if isinstance(td, timedelta):
        return str(td)
    return td
     
@app.route('/', methods=['GET'])
def get_flights():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM flight_oneway')  # Replace 'flight_oneway' with your actual table name
    flights = cursor.fetchall()

    # Convert timedelta fields to string
    for flight in flights:
        for key, value in flight.items():
            if isinstance(value, timedelta):
                flight[key] = timedelta_to_str(value)

    cursor.close()
    connection.close()
    return jsonify(flights)

if _name_ == '_main_':
    app.run(debug=True, port=5001)