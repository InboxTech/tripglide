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
#         database='main'  # Update with your actual database name
#     )
    
#     return connection

# # Convert timedelta to string format "HH:MM:SS"
# def timedelta_to_str(td):
#     if isinstance(td, timedelta):
#         return str(td)
#     return td
     
# @app.route('/hotel', methods=['GET'])
# def get_hotels():
#     connection = get_db_connection()
#     cursor = connection.cursor(dictionary=True)
#     cursor.execute('SELECT * FROM hotel')  # Replace 'hotel_oneway' with your actual table name
#     hotels = cursor.fetchall()

#     # Convert timedelta fields to string
#     for hotel in hotels:
#         for key, value in hotel.items():
#             if isinstance(value, timedelta):
#                 hotel[key] = timedelta_to_str(value)
#         print(hotel,"\n")

#     cursor.close()
#     connection.close()
#     return jsonify(hotels)

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)/




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
@app.route('/hotel', methods=['GET'])
def get_data():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = connection.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT * FROM hotel")
        data = cursor.fetchall()

        # Fetch unique cars
        cursor.execute("SELECT DISTINCT arrival FROM hotel")
        hotel_type = [row["arrival"] for row in cursor.fetchall()]
        
        # cursor.execute("SELECT DISTINCT model FROM cars")
        # car_model = [row["model"] for row in cursor.fetchall()]

        return jsonify({
            "hotel_type": hotel_type if hotel_type else [],
            # "car_model": car_model if car_model else [],
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