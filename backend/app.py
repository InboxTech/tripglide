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
        
          database='main'  # Update with your actual database name
    )
    return connection

# Convert timedelta to string format "HH:MM:SS"
def timedelta_to_str(td):
    if isinstance(td, timedelta):
        return str(td)
    return td
     
@app.route('/', methods=['GET'])
def get_hotels():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM hotels')  # Replace 'hotel_oneway' with your actual table name
    hotels = cursor.fetchall()

    # Convert timedelta fields to string
    for hotel in hotels:
        for key, value in hotel.items():
            if isinstance(value, timedelta):
                hotel[key] = timedelta_to_str(value)
        print(hotel,"\n")

    cursor.close()
    connection.close()
    return jsonify(hotels)

if __name__ == '__main__':
    app.run(debug=True, port=5001)