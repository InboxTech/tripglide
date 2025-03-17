from flask import Flask, jsonify, request
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
        port="3307",
        database='main'  # Update with your actual database name
    )
    return connection

# Convert timedelta to string format "HH:MM:SS"
def timedelta_to_str(td):
    if isinstance(td, timedelta):
        return str(td)
    return td

# API endpoint to fetch one-way flights based on search criteria
# @app.route('/flight_oneway', methods=['GET'])
# def get_flights():
#     from_city = request.args.get('from')
#     to_city = request.args.get('to')
#     depart_date = request.args.get('departDate')

#     connection = get_db_connection()
#     cursor = connection.cursor(dictionary=True)

#     query = "SELECT * FROM flight_oneway WHERE source = %s AND destination = %s AND departure_date = %s"
#     cursor.execute(query, (from_city, to_city, depart_date))
#     flights = cursor.fetchall()

#     for flight in flights:
#         if 'Flight_Duration_hh_mm' in flight and isinstance(flight['Flight_Duration_hh_mm'], timedelta):
#             flight['Flight_Duration_hh_mm'] = timedelta_to_str(flight['Flight_Duration_hh_mm'])

#     cursor.close()
#     connection.close()
#     return jsonify(flights)

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)

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

if __name__ == '__main__':
    app.run(debug=True, port=5001)