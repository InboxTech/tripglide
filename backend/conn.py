import mysql.connector
import pandas as pd

# Database Configuration (For XAMPP MySQL)
db_config = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "",
    "port": 3307,
    "database": "main"
}

try:
    # Establish database connection
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Load the CSV file into a DataFrame
    #file_path = r"C:\Users\Jinal\Downloads\Car_table.csv"
    car_df = pd.read_excel(r"C:\Users\Jinal\Downloads\Car_table.xlsx")
    #car_df = pd.read_csv(file_path)

    # ✅ Rename DataFrame columns to match MySQL table structure
    car_df.rename(columns={
        "Car_Id": "CarID",
        "Make": "Make",
        "Model": "Model",
        "Car Type": "CarType",
        "Mileage (km/l)": "Mileage_kmpl",
        "Year of Manufacture": "Year_Of_Manufacture",
        "Price per Hour (INR)": "Price_Per_Hour_INR",
        "Occupancy": "Seats",
        "Fuel Policy": "Fuel_Policy",
        "AC": "AC",
        "Transmission": "Transmission",
        "Luggage Capacity": "Luggage_Capacity",
        "City": "City",
        "Agency_Name": "Agency",
        "Base_Fare": "Base_Fare",
        "LocationID": "LocationID",
        "Unlimited Mileage": "Unlimited_Mileage",
        "Free Cancellation": "Free_Cancellation",
        "Ratings": "Ratings"
    }, inplace=True)

    # ✅ Ensure numeric columns are converted to appropriate types
    numeric_columns = ["Mileage_kmpl", "Year_Of_Manufacture", "Price_Per_Hour_INR", "Seats", "Luggage_Capacity", "Base_Fare", "LocationID"]
    for col in numeric_columns:
        car_df[col] = pd.to_numeric(car_df[col], errors='coerce').fillna(0).astype(int)
    #✅ Clean and normalize column names (strip spaces + replace special characters)
    #car_df.columns = car_df.columns.str.strip().str.replace(r'[^\w\s]', '_', regex=True)

    
     # ✅ Print column names after renaming to verify
    print("After renaming columns:", car_df.columns.tolist())

    # ✅ Check for any missing columns before processing
    expected_columns = [
        "Mileage_kmpl", "Year_Of_Manufacture", "Price_Per_Hour_INR",
        "Seats", "Luggage_Capacity", "Base_Fare", "LocationID"
    ]
    
    missing_columns = [col for col in expected_columns if col not in car_df.columns]
    if missing_columns:
        raise KeyError(f"❌ Missing columns: {missing_columns}")

    # ✅ Ensure numeric columns are converted to appropriate types
    for col in expected_columns:
        car_df[col] = pd.to_numeric(car_df[col], errors='coerce').fillna(0).astype(int)


    # ✅ Exclude 'CarID' while inserting (since it's auto-increment)
    insert_query = """
    INSERT INTO Cars (Make, Model, CarType, Mileage_kmpl, Year_Of_Manufacture, Price_Per_Hour_INR, Seats, Fuel_Policy, AC, Transmission, Luggage_Capacity, City, Agency, Base_Fare, LocationID, Unlimited_Mileage, Free_Cancellation, Ratings) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    # ✅ Convert DataFrame to list of tuples for insertion
    data_to_insert = car_df.iloc[:, 1:].to_records(index=False).tolist()  # Excludes CarID (index 0)

    # ✅ Insert data in chunks to avoid packet size issues
    chunk_size = 500  # Adjust chunk size based on your system performance
    for i in range(0, len(data_to_insert), chunk_size):
        cursor.executemany(insert_query, data_to_insert[i:i+chunk_size])
        conn.commit()

    print("✅ Data successfully inserted into Car table.")

except mysql.connector.Error as err:
    print(f"❌ DatabaseError: {err}")

finally:
    # ✅ Close the connection
    if 'cursor' in locals():
        cursor.close()
    if 'conn' in locals():
        conn.close()



##RoundTripFlight - data
# import mysql.connector
# import pandas as pd

# # Database Configuration (For XAMPP MySQL)
# db_config = {
#     "host": "127.0.0.1",
#     "user": "root",
#     "password": "",
#     "database": "main"
# }

# try:
#     # Establish database connection
#     conn = mysql.connector.connect(**db_config)
#     cursor = conn.cursor()

#     # Load the CSV file into a DataFrame
#     flights_df = pd.read_excel(r"C:\Users\Jinal\Downloads\RoundTripFlight.xlsx")
#     #main_df = pd.read_excel(file_path)

#     # ✅ Rename DataFrame columns to match MySQL table structure
#     flights_df.rename(columns={
#         "travelCode": "Travel_Code",
#         "User_ID": "User_ID",
#         "Departure": "Departure",
#         "Arrival": "Arrival",
#         "Departure_Date": "Departure_Date",
#         "Arrival_Date": "Arrival_Date",
#         "ReturnDeparture_Date": "Return_Departure_Date",
#         "ReturnArrival_Date": "Return_Arrival_Date",
#         "flightType": "Flight_Type",
#         "Flight_agency": "Flight_Agency",
#         "Flight Distance (km)": "Flight_Distance_km",
#         "Flight Duration": "Flight_Duration_hh_mm",
#         "Roundtrip_Cost": "Round_Trip_Cost"
#     }, inplace=True)

#     # ✅ Ensure numeric columns are converted to appropriate types
#     numeric_columns = ["Travel_Code", "User_ID"]
#     for col in numeric_columns:
#         flights_df[col] = pd.to_numeric(flights_df[col], errors='coerce').fillna(0).astype(int)

#     # ✅ Exclude 'CarID' while inserting (since it's auto-increment)
#     insert_query = """
#     INSERT INTO flights (Travel_Code, User_ID, Departure, Arrival, Departure_Date, Arrival_Date, Return_Departure_Date, Return_Arrival_Date, Flight_Type, Flight_Agency, Flight_Distance_km, Flight_Duration_hh_mm, Round_Trip_Cost)
#      VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#     """

#     # ✅ Convert DataFrame to list of tuples for insertion
#     data_to_insert = [tuple(row) for row in flights_df.itertuples(index=False, name=None)]

#     # ✅ Insert data in chunks to avoid packet size issues
#     chunk_size = 500  # Adjust chunk size based on your system performance
#     for i in range(0, len(data_to_insert), chunk_size):
#         cursor.executemany(insert_query, data_to_insert[i:i+chunk_size])
#         conn.commit()

#     print("✅ Data successfully inserted into flight table.")

# except mysql.connector.Error as err:
#     print(f"❌ DatabaseError: {err}")

# finally:
#     # ✅ Close the connection
#     if 'cursor' in locals():
#         cursor.close()
#     if 'conn' in locals():
#         conn.close()



##OneWayFlight - data
# import mysql.connector
# import pandas as pd

# # Database Configuration (For XAMPP MySQL)
# db_config = {
#     "host": "127.0.0.1",
#     "user": "root",
#     "password": "",
#     "database": "main"
# }

# try:
#     # Establish database connection
#     conn = mysql.connector.connect(**db_config)
#     cursor = conn.cursor()

#     # Load the CSV file into a DataFrame
#     flight_df = pd.read_excel(r"C:\Users\Jinal\Downloads\OneWayFlight.xlsx")
#     #main_df = pd.read_excel(file_path)

#     # ✅ Rename DataFrame columns to match MySQL table structure
#     flight_df.rename(columns={
#         "travelCode": "Travel_Code",
#         "User_ID": "User_ID",
#         "flightType": "Flight_Type",
#         "Flight_agency": "Flight_Agency",
#         "Departure_date": "Departure_Date",
#         "Departure": "Departure",
#         "Arrival": "Arrival",
#         "Flight Distance (km)": "Flight_Distance_km",
#         "Flight Duration (hh:mm)": "Flight_Duration_hh_mm",
#         "Departure Time": "Departure_Time",
#         "Arrival Time": "Arrival_Time",
#         "flight_number": "Flight_Number",
#         "Calculated_Flight_Price": "Calculated_Flight_Price"
#     }, inplace=True)

#     # ✅ Ensure numeric columns are converted to appropriate types
#     numeric_columns = ["Travel_Code", "User_ID"]
#     for col in numeric_columns:
#         flight_df[col] = pd.to_numeric(flight_df[col], errors='coerce').fillna(0).astype(int)

#     # ✅ Exclude 'CarID' while inserting (since it's auto-increment)
#     insert_query = """
#     INSERT INTO flight (Travel_Code, User_ID, Flight_Type, Flight_Agency, Departure_Date, Departure, Arrival, Flight_Distance_km, Flight_Duration_hh_mm, Departure_Time, Arrival_Time, Flight_Number, Calculated_Flight_Price) 
#     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#     """

#     # ✅ Convert DataFrame to list of tuples for insertion
#     data_to_insert = [tuple(row) for row in flight_df.itertuples(index=False, name=None)]

#     # ✅ Insert data in chunks to avoid packet size issues
#     chunk_size = 500  # Adjust chunk size based on your system performance
#     for i in range(0, len(data_to_insert), chunk_size):
#         cursor.executemany(insert_query, data_to_insert[i:i+chunk_size])
#         conn.commit()

#     print("✅ Data successfully inserted into flight table.")

# except mysql.connector.Error as err:
#     print(f"❌ DatabaseError: {err}")

# finally:
#     # ✅ Close the connection
#     if 'cursor' in locals():
#         cursor.close()
#     if 'conn' in locals():
#         conn.close()




# import mysql.connector
# import pandas as pd

# # ✅ Update database configuration for XAMPP MySQL
# db_config = {
#     "host": "127.0.0.1",  # XAMPP MySQL runs on localhost
#     "user": "root",       # Default XAMPP MySQL username
#     "password": "",       # Default is empty
#     "database": "car"     # Change to your actual database name
# }

# # ✅ Sample DataFrame (Replace this with actual data)

# location_df = pd.read_excel(r"C:\Users\Jinal\Downloads\Location_Table.xlsx")


# try:
#     # ✅ Establish a connection to XAMPP MySQL
#     conn = mysql.connector.connect(**db_config)
#     cursor = conn.cursor()

#     # ✅ Correct SQL Query (Exclude LocationID as it's auto-incremented)
#     insert_query = """
#     INSERT INTO Locations (Name, Address, City, Country) 
#     VALUES (%s, %s, %s, %s)
#     """

#     # ✅ Convert DataFrame rows into a list of tuples
#     data_to_insert = [(row[1], row[2], row[3], "India") for row in location_df.itertuples(index=False, name=None)]

#     # ✅ Execute the insert query
#     cursor.executemany(insert_query, data_to_insert)

#     # ✅ Commit the transaction
#     conn.commit()
#     print("✅ Data successfully inserted into Locations table.")

# except mysql.connector.Error as err:
#     print(f"❌ Database Error: {err}")

# finally:
#     # ✅ Close the connection
#     if 'cursor' in locals():
#         cursor.close()
#     if 'conn' in locals():
#         conn.close()


