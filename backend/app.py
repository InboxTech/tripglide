# Import necessary api's in one api
from flask import Flask, jsonify,request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# MySQL connection function
def get_db_connection():
    try:
        return mysql.connector.connect(
            host='localhost',
            user='root',  # Update with your MySQL username
            password='',  # Update with your MySQL password
            # port="3307",  # Update if different
            database='main'  # Update with your actual database name
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
                "make": row["Make"],  # Corrected
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

# Run the Flask app and print data in the console
if __name__ == '__main__':
    app.run(debug=True, port=5001)