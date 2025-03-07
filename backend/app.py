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
        user='root',  # Update this with your actual MySQL username
        password='',  # Update this with your actual MySQL password
        database='tripglide'  # Use your actual database name
    )
    return connection
 
# Convert timedelta to a string in the format "HH:MM:SS"
def timedelta_to_str(td):
    if isinstance(td, timedelta):
        return str(td)  # Converts timedelta to string in "HH:MM:SS" format
    return td
 
# API endpoint to fetch flights
@app.route('/', methods=['GET'])
def get_flights():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM flights')  # Replace 'flights' with your actual table name
    flights = cursor.fetchall()
   
    # Convert timedelta to string for JSON serialization
    for flight in flights:
        flight['duration'] = timedelta_to_str(flight['duration'])  # Convert duration to string
   
    cursor.close()
    connection.close()
    return jsonify(flights)
 
if __name__ == '__main__':
    app.run(debug=True, port=5000)