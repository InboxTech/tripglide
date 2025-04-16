# # from flask import Flask, jsonify, request
# # import mysql.connector
# # from flask_cors import CORS
# # import stripe

# # app = Flask(__name__)
# # CORS(app)  # Allow your frontend (e.g., http://localhost:5173)

# # # Set your Stripe secret key
# # stripe.api_key = 'sk_test_51RBq3dPlQbJhRZQuFznwHLWQKdYK7o6ZMRPcykMQJrVT4goDZs056Fjkac47TTzEiuyg0P06VsPQPESvM8fY8MlX00ARWblp0v'

# # # MySQL connection function
# # def get_db_connection():
# #     try:
# #         return mysql.connector.connect(
# #             host='localhost',
# #             user='root',
# #             password='',
# #             # port="3307",
# #             database='main'
# #         )
# #     except mysql.connector.Error as e:
# #         print(f"Error connecting to MySQL: {e}")
# #         return None

# # def fetch_data(query, params=None):
# #     connection = get_db_connection()
# #     if connection is None:
# #         return None, "Database connection failed"
# #     cursor = connection.cursor(dictionary=True)
# #     try:
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

# # @app.route('/locations', methods=['GET'])
# # def get_locations():
# #     query = "SELECT DISTINCT City FROM cars ORDER BY City ASC"
# #     location_data, error = fetch_data(query)
# #     if error:
# #         return jsonify({"error": error}), 500
# #     locations = [row['City'] for row in location_data if row.get('City')]
# #     return jsonify({"locations": locations})

# # @app.route('/locations/terminals', methods=['GET'])
# # def get_terminals():
# #     query = "SELECT DISTINCT Name FROM locations ORDER BY Name ASC"
# #     terminal_data, error = fetch_data(query)
# #     if error:
# #         return jsonify({"error": error}), 500
# #     terminals = [row['Name'] for row in terminal_data if row.get('Name')]
# #     return jsonify({"terminals": terminals})

# # @app.route('/', methods=['GET'])
# # def get_data():
# #     location = request.args.get('location')
# #     no_of_passengers = request.args.get('no_of_passenger')
# #     car_type = request.args.get('cartype')
# #     transmission = request.args.get('transmission')
# #     fuel_policy = request.args.get('fuel_policy')
# #     make = request.args.get('make')
# #     model = request.args.get('model')
# #     price = request.args.get('price')
# #     agency = request.args.get('agency')
# #     ratings = request.args.get('ratings')

# #     query_conditions = []
# #     query_params = []

# #     if location:
# #         query_conditions.append("City = %s")
# #         query_params.append(location)
# #     if no_of_passengers:
# #         query_conditions.append("Seats = %s")
# #         query_params.append(no_of_passengers)
# #     if car_type:
# #         query_conditions.append("CarType = %s")
# #         query_params.append(car_type)
# #     if make:
# #         query_conditions.append("Make = %s")
# #         query_params.append(make)
# #     if model:
# #         query_conditions.append("Model = %s")
# #         query_params.append(model)
# #     if fuel_policy:
# #         query_conditions.append("Fuel_Policy = %s")
# #         query_params.append(fuel_policy)
# #     if transmission:
# #         query_conditions.append("Transmission = %s")
# #         query_params.append(transmission)
# #     if price:
# #         query_conditions.append("Price_Per_Hour_INR = %s")
# #         query_params.append(price)
# #     if agency:
# #         query_conditions.append("Agency = %s")
# #         query_params.append(agency)
# #     if ratings:
# #         query_conditions.append("Ratings = %s")
# #         query_params.append(ratings)

# #     base_query = "SELECT * FROM cars"
# #     if query_conditions:
# #         base_query += " WHERE " + " AND ".join(query_conditions)

# #     car_data, error = fetch_data(base_query, tuple(query_params))
# #     if error:
# #         return jsonify({"error": error}), 500

# #     formatted_response = []
# #     if car_data:
# #         for row in car_data:
# #             formatted_response.append({
# #                 "id": row.get("CarID", "N/A"),
# #                 "location": row["City"],
# #                 "passengers": row["Seats"],
# #                 "type": row.get("CarType", "N/A"),
# #                 "make": row["Make"],
# #                 "model": row["Model"],
# #                 "fuel_policy": row["Fuel_Policy"],
# #                 "transmission": row["Transmission"],
# #                 "price": row["Price_Per_Hour_INR"],
# #                 "agency": row["Agency"],
# #                 "ratings": row.get("Ratings", "N/A"),
# #                 "ac": row.get("AC", "N/A"),
# #                 "image": "https://via.placeholder.com/300x200"  # Placeholder image
# #             })

# #     return jsonify(formatted_response)

# # @app.route('/create-checkout-session', methods=['POST'])
# # def create_checkout_session():
# #     try:
# #         data = request.get_json()
# #         pickup_location = data.get('pickupLocation')
# #         pickup_date = data.get('pickupDate')
# #         pickup_time = data.get('pickupTime')
# #         dropoff_date = data.get('dropoffDate')
# #         dropoff_time = data.get('dropoffTime')
# #         car_id = data.get('carId')
# #         car_make = data.get('carMake')
# #         car_model = data.get('carModel')
# #         total_price = data.get('amount')  # Expecting amount in paise
# #         agency = data.get('agency')

# #         if not total_price or total_price <= 0:
# #             return jsonify({'error': 'Invalid total price'}), 400

# #         # Convert total_price to paise if not already (assuming it's in INR)
# #         amount_in_paise = int(float(total_price))

# #         # Create a Stripe Checkout Session
# #         session = stripe.checkout.Session.create(
# #             payment_method_types=['card'],
# #             line_items=[{
# #                 'price_data': {
# #                     'currency': 'inr',
# #                     'product_data': {
# #                         'name': f'Car Rental: {car_make} {car_model}',
# #                         'description': f'Pickup: {pickup_location} on {pickup_date} {pickup_time}, Dropoff: {dropoff_date} {dropoff_time}',
# #                     },
# #                     'unit_amount': amount_in_paise,
# #                 },
# #                 'quantity': 1,
# #             }],
# #             mode='payment',
# #             success_url='http://localhost:5173/booking-confirmed',
# #             cancel_url='http://localhost:5173/cancel',
# #             metadata={
# #                 'car_id': str(car_id),
# #                 'pickup_location': pickup_location,
# #                 'pickup_date': pickup_date,
# #                 'dropoff_date': dropoff_date,
# #                 'agency': agency
# #             }
# #         )


# #         return jsonify({'id': session.id})
# #     except stripe.error.StripeError as e:
# #         return jsonify({'error': str(e)}), 400
# #     except Exception as e:
# #         print(f"Error creating checkout session: {e}")
# #         return jsonify({'error': str(e)}), 500

# # @app.route('/api/save-booking', methods=['POST'])
# # def save_booking():
# #     try:
# #         data = request.get_json()

# #         # Extract and transform data
# #         car = data.get('car', {})
# #         selectedDeal = data.get('selectedDeal', {})
# #         extras = data.get('extras', {})
# #         pickup_datetime = f"{data.get('pickupDate', '')} {data.get('pickupTime', '')}"
# #         dropoff_datetime = f"{data.get('dropoffDate', '')} {data.get('dropoffTime', '')}"

# #         # Create new CabBooking record
# #         new_booking = CabBooking(
# #             car_make=car.get('make', 'Not specified'),
# #             car_model=car.get('model', 'Not specified'),
# #             car_type=car.get('type', 'Not specified'),
# #             car_passengers=int(car.get('passengers', 0)) if car.get('passengers', 'Not specified') != 'Not specified' else 0,
# #             car_transmission=car.get('transmission', 'Not specified'),
# #             car_ac=car.get('ac', 'Not specified') == 'Yes',
# #             selectedDeal_agency=selectedDeal.get('agency', 'Not specified'),
# #             selectedDeal_pricePerDay=float(selectedDeal.get('pricePerDay', 0)),
# #             selectedDeal_fuelPolicy=selectedDeal.get('fuelPolicy', 'Not specified'),
# #             selectedDeal_id=int(selectedDeal.get('id', 0)),
# #             pickupLocation=data.get('pickupLocation', 'Not specified'),
# #             pickupDate=pickup_datetime if pickup_datetime != 'Not specified Not specified' else None,
# #             pickupTime=data.get('pickupTime', '00:00:00') if data.get('pickupTime', 'Not specified') != 'Not specified' else '00:00:00',
# #             dropoffDate=dropoff_datetime if dropoff_datetime != 'Not specified Not specified' else None,
# #             dropoffTime=data.get('dropoffTime', '00:00:00') if data.get('dropoffTime', 'Not specified') != 'Not specified' else '00:00:00',
# #             dropoffLocation=data.get('dropoffLocation', 'Not specified'),
# #             extras_additionalDriver=bool(extras.get('additionalDriver', False)),
# #             extras_extraLuggage=bool(extras.get('extraLuggage', False)),
# #             extras_childSeat=bool(extras.get('childSeat', False)),
# #             totalPrice=float(data.get('totalPrice', 0))
# #         )

# #         # Add and commit to database
# #         db.session.add(new_booking)
# #         db.session.commit()

# #         return jsonify({
# #             'message': 'Booking saved successfully',
# #             'bookingId': new_booking.id
# #         }), 201

# #     except Exception as e:
# #         db.session.rollback()
# #         return jsonify({'error': str(e)}), 500

        
# # if __name__ == '__main__':
# #     app.run(debug=True, port=5008)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import mysql.connector
# import stripe

# app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # Explicitly allow React origin

# # Set your Stripe secret key
# stripe.api_key = 'sk_test_51RBq3dPlQbJhRZQuFznwHLWQKdYK7o6ZMRPcykMQJrVT4goDZs056Fjkac47TTzEiuyg0P06VsPQPESvM8fY8MlX00ARWblp0v'  # Replace with your actual key

# # MySQL connection function
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

# # Existing endpoints (unchanged)
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
#     query = "SELECT DISTINCT Name FROM locations ORDER BY Name ASC"
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
#     make = request.args.get('make')
#     model = request.args.get('model')
#     price = request.args.get('price')
#     agency = request.args.get('agency')
#     ratings = request.args.get('ratings')

#     query_conditions = []
#     query_params = []

#     if location:
#         query_conditions.append("City = %s")
#         query_params.append(location)
#     if no_of_passengers:
#         query_conditions.append("Seats = %s")
#         query_params.append(no_of_passengers)
#     if car_type:
#         query_conditions.append("CarType = %s")
#         query_params.append(car_type)
#     if make:
#         query_conditions.append("Make = %s")
#         query_params.append(make)
#     if model:
#         query_conditions.append("Model = %s")
#         query_params.append(model)
#     if fuel_policy:
#         query_conditions.append("Fuel_Policy = %s")
#         query_params.append(fuel_policy)
#     if transmission:
#         query_conditions.append("Transmission = %s")
#         query_params.append(transmission)
#     if price:
#         query_conditions.append("Price_Per_Hour_INR = %s")
#         query_params.append(price)
#     if agency:
#         query_conditions.append("Agency = %s")
#         query_params.append(agency)
#     if ratings:
#         query_conditions.append("Ratings = %s")
#         query_params.append(ratings)

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
#                 "ac": row.get("AC", "N/A"),
#                 "image": "https://via.placeholder.com/300x200"  # Placeholder image
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
#         total_price = data.get('amount')  # Expecting amount in paise
#         agency = data.get('agency')

#         if not total_price or total_price <= 0:
#             return jsonify({'error': 'Invalid total price'}), 400

#         # Convert total_price to paise if not already (assuming it's in INR)
#         amount_in_paise = int(float(total_price))

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
#             success_url='http://localhost:5173/booking-confirmed',
#             cancel_url='http://localhost:5173/cancel',
#             metadata={
#                 'car_id': str(car_id),
#                 'pickup_location': pickup_location,
#                 'pickup_date': pickup_date,
#                 'dropoff_date': dropoff_date,
#                 'agency': agency
#             }
#         )

#         return jsonify({'id': session.id})
#     except stripe.error.StripeError as e:
#         return jsonify({'error': str(e)}), 400
#     except Exception as e:
#         print(f"Error creating checkout session: {e}")
#         return jsonify({'error': str(e)}), 500

# @app.route('/api/save-booking', methods=['POST'])
# def save_booking():
#     try:
#         data = request.get_json()

#         # Extract and transform data
#         car = data.get('car', {})
#         selectedDeal = data.get('selectedDeal', {})
#         extras = data.get('extras', {})
#         pickup_datetime = f"{data.get('pickupDate', '')} {data.get('pickupTime', '')}"
#         dropoff_datetime = f"{data.get('dropoffDate', '')} {data.get('dropoffTime', '')}"

#         connection = get_db_connection()
#         if connection is None:
#             return jsonify({'error': 'Database connection failed'}), 500

#         cursor = connection.cursor()
#         query = """
#             INSERT INTO cab_booking (
#                 car_make, car_model, car_type, car_passengers, car_transmission, car_ac,
#                 selectedDeal_agency, selectedDeal_pricePerDay, selectedDeal_fuelPolicy, selectedDeal_id,
#                 pickupLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, dropoffLocation,
#                 extras_additionalDriver, extras_extraLuggage, extras_childSeat, totalPrice
#             ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#         """
#         values = (
#             car.get('make', 'Not specified'),
#             car.get('model', 'Not specified'),
#             car.get('type', 'Not specified'),
#             int(car.get('passengers', 0)) if car.get('passengers', 'Not specified') != 'Not specified' else 0,
#             car.get('transmission', 'Not specified'),
#             1 if car.get('ac', 'Not specified') == 'Yes' else 0,
#             selectedDeal.get('agency', 'Not specified'),
#             float(selectedDeal.get('pricePerDay', 0)),
#             selectedDeal.get('fuelPolicy', 'Not specified'),
#             int(selectedDeal.get('id', 0)),
#             data.get('pickupLocation', 'Not specified'),
#             pickup_datetime if pickup_datetime != 'Not specified Not specified' else None,
#             data.get('pickupTime', '00:00:00') if data.get('pickupTime', 'Not specified') != 'Not specified' else '00:00:00',
#             dropoff_datetime if dropoff_datetime != 'Not specified Not specified' else None,
#             data.get('dropoffTime', '00:00:00') if data.get('dropoffTime', 'Not specified') != 'Not specified' else '00:00:00',
#             data.get('dropoffLocation', 'Not specified'),
#             bool(extras.get('additionalDriver', False)),
#             bool(extras.get('extraLuggage', False)),
#             bool(extras.get('childSeat', False)),
#             float(data.get('totalPrice', 0))
#         )

#         cursor.execute(query, values)
#         connection.commit()
#         booking_id = cursor.lastrowid

#         cursor.close()
#         connection.close()

#         return jsonify({
#             'message': 'Booking saved successfully',
#             'bookingId': booking_id
#         }), 201

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5008)






from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import stripe

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allow all routes from React origin

# Set your Stripe secret key
stripe.api_key = 'sk_test_51RBq3dPlQbJhRZQuFznwHLWQKdYK7o6ZMRPcykMQJrVT4goDZs056Fjkac47TTzEiuyg0P06VsPQPESvM8fY8MlX00ARWblp0v'  # Replace with your actual key

# MySQL connection function
def get_db_connection():
    try:
        return mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
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
    model = request.args.get('model')
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
    if model:
        query_conditions.append("Model = %s")
        query_params.append(model)
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
                "model": row["Model"],
                "fuel_policy": row["Fuel_Policy"],
                "transmission": row["Transmission"],
                "price": row["Price_Per_Hour_INR"],
                "agency": row["Agency"],
                "ratings": row.get("Ratings", "N/A"),
                "ac": row.get("AC", "N/A"),
                "image": "https://via.placeholder.com/300x200"
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
        total_price = data.get('amount')
        agency = data.get('agency')

        if not total_price or total_price <= 0:
            return jsonify({'error': 'Invalid total price'}), 400

        amount_in_paise = int(float(total_price))

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

@app.route('/api/save-booking', methods=['POST'])
def save_booking():
    try:
        data = request.get_json()

        car = data.get('car', {})
        selectedDeal = data.get('selectedDeal', {})
        extras = data.get('extras', {})
        pickup_datetime = f"{data.get('pickupDate', '')} {data.get('pickupTime', '')}"
        dropoff_datetime = f"{data.get('dropoffDate', '')} {data.get('dropoffTime', '')}"

        connection = get_db_connection()
        if connection is None:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = connection.cursor()
        query = """
            INSERT INTO cab_booking (
                car_make, car_model, car_type, car_passengers, car_transmission, car_ac,
                selectedDeal_agency, selectedDeal_pricePerDay, selectedDeal_fuelPolicy, selectedDeal_id,
                pickupLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, dropoffLocation,
                extras_additionalDriver, extras_extraLuggage, extras_childSeat, totalPrice
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            car.get('make', 'Not specified'),
            car.get('model', 'Not specified'),
            car.get('type', 'Not specified'),
            int(car.get('passengers', 0)) if car.get('passengers', 'Not specified') != 'Not specified' else 0,
            car.get('transmission', 'Not specified'),
            1 if car.get('ac', 'Not specified') == 'Yes' else 0,
            selectedDeal.get('agency', 'Not specified'),
            float(selectedDeal.get('pricePerDay', 0)),
            selectedDeal.get('fuelPolicy', 'Not specified'),
            int(selectedDeal.get('id', 0)),
            data.get('pickupLocation', 'Not specified'),
            pickup_datetime if pickup_datetime != 'Not specified Not specified' else None,
            data.get('pickupTime', '00:00:00') if data.get('pickupTime', 'Not specified') != 'Not specified' else '00:00:00',
            dropoff_datetime if dropoff_datetime != 'Not specified Not specified' else None,
            data.get('dropoffTime', '00:00:00') if data.get('dropoffTime', 'Not specified') != 'Not specified' else '00:00:00',
            data.get('dropoffLocation', 'Not specified'),
            bool(extras.get('additionalDriver', False)),
            bool(extras.get('extraLuggage', False)),
            bool(extras.get('childSeat', False)),
            float(data.get('totalPrice', 0))
        )

        cursor.execute(query, values)
        connection.commit()
        booking_id = cursor.lastrowid

        cursor.close()
        connection.close()

        return jsonify({
            'message': 'Booking saved successfully',
            'bookingId': booking_id
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5008)