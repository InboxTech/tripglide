import mysql.connector
import pandas as pd

# Database Configuration (For XAMPP MySQL)
db_config = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "",
    "port": 3307,
    "database": "tripglide"
}

try:
    # Establish database connection
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Load the Excel file into a DataFrame
    file_path = r"C:\Users\Jinal\Downloads\future_cardata.xlsx"
    car_df = pd.read_excel(file_path)

    # ✅ Rename DataFrame columns to match `future_car_data` table structure
    car_df.rename(columns={
        "Rental_ID": "Rental_ID",
        "Car_ID": "Car_ID",
        "User_ID": "User_ID",
        "Pickup_Location": "Pickup_Location",
        "Rental_Date": "Rental_Date",
        "Return_Date": "Return_Date",
        "Duration_Hours": "Duration_Hours",
        "Total_Amount": "Total_Amount"
    }, inplace=True)

    # ✅ Ensure numeric columns are converted to appropriate types
    numeric_columns = ["Rental_ID", "Car_ID", "User_ID", "Duration_Hours", "Total_Amount"]
    for col in numeric_columns:
        car_df[col] = pd.to_numeric(car_df[col], errors='coerce').fillna(0).astype(int)

    # ✅ Print column names after renaming to verify
    print("After renaming columns:", car_df.columns.tolist())

    # ✅ Check for any missing columns before processing
    expected_columns = ["Rental_ID", "Car_ID", "User_ID", "Pickup_Location", "Rental_Date", "Return_Date", "Duration_Hours", "Total_Amount"]
    
    missing_columns = [col for col in expected_columns if col not in car_df.columns]
    if missing_columns:
        raise KeyError(f"❌ Missing columns: {missing_columns}")

    # ✅ Insert query adjusted for `future_car_data`
    insert_query = """
    INSERT INTO future_car_data (Rental_ID, Car_ID, User_ID, Pickup_Location, Rental_Date, Return_Date, Duration_Hours, Total_Amount) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    # ✅ Convert DataFrame to list of tuples for insertion
    data_to_insert = car_df.to_records(index=False).tolist()

    # ✅ Insert data in chunks to avoid packet size issues
    chunk_size = 500  # Adjust chunk size based on system performance
    for i in range(0, len(data_to_insert), chunk_size):
        cursor.executemany(insert_query, data_to_insert[i:i + chunk_size])
        conn.commit()

    print("✅ Data successfully inserted into `future_car_data` table.")

except mysql.connector.Error as err:
    print(f"❌ DatabaseError: {err}")

except Exception as e:
    print(f"⚠️ Error: {e}")

finally:
    # ✅ Close the connection
    if 'cursor' in locals():
        cursor.close()
    if 'conn' in locals():
        conn.close()





# ##car-rental-db
# import os
# import mysql.connector
# import pandas as pd
# from datetime import datetime

# # ✅ Load CSV file
# car_rental_df = pd.read_csv(r"C:\Users\Jinal\Downloads\Car_rental.csv")

# # ✅ Convert Data Types for Compatibility
# car_rental_df["travelCode"] = car_rental_df["travelCode"].astype(int)
# car_rental_df["user_id"] = car_rental_df["user_id"].astype(int)
# car_rental_df["Pickup_Location"] = car_rental_df["Pickup_Location"].astype(str)

# # ✅ Convert 'rental_date' and 'return_date' to string format for MySQL
# car_rental_df["rental_date"] = pd.to_datetime(car_rental_df["rental_date"], format="%d-%m-%Y %H:%M")
# car_rental_df["return_date"] = pd.to_datetime(car_rental_df["return_date"], format="%d-%m-%Y %H:%M")

# # 🔹 Convert timestamps to string format for MySQL
# car_rental_df["rental_date"] = car_rental_df["rental_date"].dt.strftime("%Y-%m-%d %H:%M:%S")
# car_rental_df["return_date"] = car_rental_df["return_date"].dt.strftime("%Y-%m-%d %H:%M:%S")

# # ✅ Convert numerical and string columns
# car_rental_df["duration"] = car_rental_df["duration"].astype(int)
# car_rental_df["Car_Id"] = car_rental_df["Car_Id"].astype(int)
# car_rental_df["total_amount"] = car_rental_df["total_amount"].astype(float)
# car_rental_df["Duration_Hours"] = car_rental_df["Duration_Hours"].astype(int)
# car_rental_df["Total_Minutes"] = car_rental_df["Total_Minutes"].astype(int)
# car_rental_df["Days"] = car_rental_df["Days"].astype(int)
# car_rental_df["Hours"] = car_rental_df["Hours"].astype(int)
# car_rental_df["Formatted_Duration"] = car_rental_df["Formatted_Duration"].astype(str)
# car_rental_df["Duration_Days"] = car_rental_df["Duration_Days"].astype(float)

# # ✅ Fetch database credentials from environment variables
# db_config = {
#     "host": "127.0.0.1",
#     "user": "root",
#     "password": "",
#     "port": 3307,
#     "database": "tripglide"
# }

# try:
#     # ✅ Establish database connection
#     conn = mysql.connector.connect(**db_config, use_pure=True, unix_socket=None)
#     cursor = conn.cursor()

#     # ✅ Define INSERT SQL Query (Exclude RentalID - Auto-incremented)
#     insert_query = """
#     INSERT INTO Rentals (TravelCode, UserID, Pickup_Location, RentalDate, Duration, ReturnDate, 
#                          CarID, TotalAmount, Duration_Hours, Total_Minutes, `Days`, `Hours`, 
#                          Formatted_Duration, Duration_Days) 
#     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#     """

#     # ✅ Convert DataFrame rows to list of tuples
#     data_to_insert = [
#         (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], 
#          row[8], row[9], row[10], row[11], row[12], row[13])
#         for row in car_rental_df.itertuples(index=False, name=None)
#     ]

#     # ✅ Insert in smaller batches to prevent 'max_allowed_packet' error
#     batch_size = 1000  # Split data into 1000 rows per batch
#     total_rows = len(data_to_insert)
#     for i in range(0, total_rows, batch_size):
#         batch_data = data_to_insert[i:i + batch_size]
#         cursor.executemany(insert_query, batch_data)
#         conn.commit()
#         print(f"✅ Batch {i // batch_size + 1}/{(total_rows // batch_size) + 1} inserted successfully.")

#     print("🎉 All data successfully inserted into the Rentals table.")

# except mysql.connector.Error as err:
#     print(f"❌ DatabaseError: {err}")

# finally:
#     # ✅ Close the connection
#     if 'cursor' in locals() and cursor:
#         cursor.close()
#     if 'conn' in locals() and conn.is_connected():
#         conn.close()


# ##location- database
# import mysql.connector
# import pandas as pd

# # ✅ Database Configuration (For XAMPP MySQL)
# db_config = {
#     "host": "127.0.0.1",
#     "user": "root",
#     "password": "",
#     "port": 3307,
#     "database": "tripglide"
# }

# try:
#     # ✅ Establish database connection
#     conn = mysql.connector.connect(**db_config, use_pure=True, unix_socket=None)
#     cursor = conn.cursor()
#     location_df = pd.read_excel(r"C:\Users\Jinal\Downloads\Location_Table.xlsx")
  
#     # ✅ SQL query for insertion
#     insert_query = """
#     INSERT INTO locations (Name, Address, City, Country) 
#     VALUES (%s, %s, %s, %s)
#     """

#     # ✅ Extract only Name, Address, and City (Ignore LocationID)
#     data_to_insert = [(row[1], row[2], row[3], "India") for row in location_df.itertuples(index=False, name=None)]

#     # ✅ Execute the insert query
#     cursor.executemany(insert_query, data_to_insert)

#     # ✅ Commit the transaction
#     conn.commit()
#     print("✅ Data successfully inserted into the Location table.")

# except mysql.connector.Error as err:
#     print(f"❌ DatabaseError: {err}")

# except Exception as e:
#     print(f"⚠️ Error: {e}")

# finally:
#     # ✅ Close the connection
#     if 'cursor' in locals():
#         cursor.close()
#     if 'conn' in locals():
#         conn.close()



# #car-rental table updated
# import mysql.connector
# import pandas as pd

# # Database Configuration (For XAMPP MySQL)
# db_config = {
#     "host": "127.0.0.1",
#     "user": "root",
#     "password": "",
#     "port": 3307,
#     "database": "main"
# }

# try:
#     # Establish database connection
#     conn = mysql.connector.connect(**db_config)
#     cursor = conn.cursor()

#     # Load the CSV file into a DataFrame
#     file_path = r"C:\Users\Jinal\Downloads\Car_rental.csv"
#     car_df = pd.read_csv(file_path)

#     # ✅ Rename DataFrame columns to match MySQL table structure
#     car_df.rename(columns={
#         "travelCode": "Travel_Code",
#         "user_id": "User_ID",
#         "Pickup_Location": "Pickup_Location",
#         "rental_date": "Rental_Date",
#         "duration": "Duration",
#         "return_date": "Return_Date",
#         "Car_Id": "Car_Id",
#         "total_amount": "Total_Amount",
#         "Duration_Hours": "Duration_Hours",
#         "Total_Minutes": "Total_Minutes",
#         "Days": "Days",
#         "Hours": "Hours",
#         "Formatted_Duration": "Formatted_Duration",
#         "Duration_Days": "Duration_Days"
#     }, inplace=True)

#     # ✅ Print column names after renaming to verify
#     print("After renaming columns:", car_df.columns.tolist())

#     # ✅ Check for any missing columns before processing
#     expected_columns = [
#         "Travel_Code", "User_ID", "Pickup_Location", "Rental_Date", "Duration",
#         "Return_Date", "Car_Id", "Total_Amount", "Duration_Hours", "Total_Minutes",
#         "Days", "Hours", "Formatted_Duration", "Duration_Days"
#     ]
#     missing_columns = [col for col in expected_columns if col not in car_df.columns]
#     if missing_columns:
#         raise KeyError(f"❌ Missing columns: {missing_columns}")

#     # ✅ Convert DataFrame to list of tuples for insertion (include all columns)
#     data_to_insert = car_df.to_records(index=False).tolist()

#     # ✅ Verify data length matches expected columns
#     print("Sample data length:", len(data_to_insert[0]))  # Should print 14

#     # ✅ SQL query for insertion
#     insert_query = """
#     INSERT INTO car_rental (
#         Travel_Code, User_ID, Pickup_Location, Rental_Date, Duration, Return_Date,
#         Car_Id, Total_Amount, Duration_Hours, Total_Minutes, Days, Hours,
#         Formatted_Duration, Duration_Days
#     ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#     """

#     # ✅ Insert data in chunks to avoid packet size issues
#     chunk_size = 500  # Adjust chunk size based on your system performance
#     for i in range(0, len(data_to_insert), chunk_size):
#         cursor.executemany(insert_query, data_to_insert[i:i + chunk_size])
#         conn.commit()

#     print("✅ Data successfully inserted into Car Rental table.")

# except mysql.connector.Error as err:
#     print(f"❌ DatabaseError: {err}")

# except Exception as e:
#     print(f"⚠️ Error: {e}")

# finally:
#     # ✅ Close the connection
#     if 'cursor' in locals():
#         cursor.close()
#     if 'conn' in locals():
#         conn.close()


# #car table updated
# import mysql.connector
# import pandas as pd

# # Database Configuration (For XAMPP MySQL)
# db_config = {
#     "host": "127.0.0.1",
#     "user": "root",
#     "password": "",
#     "port": 3307,
#     "database": "tripglide"
# }

# try:
#     # Establish database connection
#     conn = mysql.connector.connect(**db_config)
#     cursor = conn.cursor()

#     # Load the CSV file into a DataFrame
#     #file_path = r"C:\Users\Jinal\Downloads\Car_table.csv"
#     car_df = pd.read_excel(r"C:\Users\Jinal\Downloads\Car_table.xlsx")
#     #car_df = pd.read_csv(file_path)

#     # ✅ Rename DataFrame columns to match MySQL table structure
#     car_df.rename(columns={
#         "Car_Id": "CarID",
#         "Make": "Make",
#         "Model": "Model",
#         "Car Type": "CarType",
#         "Mileage (km/l)": "Mileage_kmpl",
#         "Year of Manufacture": "Year_Of_Manufacture",
#         "Price per Hour (INR)": "Price_Per_Hour_INR",
#         "Occupancy": "Seats",
#         "Fuel Policy": "Fuel_Policy",
#         "AC": "AC",
#         "Transmission": "Transmission",
#         "Luggage Capacity": "Luggage_Capacity",
#         "City": "City",
#         "Agency_Name": "Agency",
#         "Base_Fare": "Base_Fare",
#         "LocationID": "LocationID",
#         "Unlimited Mileage": "Unlimited_Mileage",
#         "Free Cancellation": "Free_Cancellation",
#         "Ratings": "Ratings"
#     }, inplace=True)

#     # ✅ Ensure numeric columns are converted to appropriate types
#     numeric_columns = ["Mileage_kmpl", "Year_Of_Manufacture", "Price_Per_Hour_INR", "Seats", "Luggage_Capacity", "Base_Fare", "LocationID"]
#     for col in numeric_columns:
#         car_df[col] = pd.to_numeric(car_df[col], errors='coerce').fillna(0).astype(int)
#     #✅ Clean and normalize column names (strip spaces + replace special characters)
#     #car_df.columns = car_df.columns.str.strip().str.replace(r'[^\w\s]', '_', regex=True)

    
#      # ✅ Print column names after renaming to verify
#     print("After renaming columns:", car_df.columns.tolist())

#     # ✅ Check for any missing columns before processing
#     expected_columns = [
#         "Mileage_kmpl", "Year_Of_Manufacture", "Price_Per_Hour_INR",
#         "Seats", "Luggage_Capacity", "Base_Fare", "LocationID"
#     ]
    
#     missing_columns = [col for col in expected_columns if col not in car_df.columns]
#     if missing_columns:
#         raise KeyError(f"❌ Missing columns: {missing_columns}")

#     # ✅ Ensure numeric columns are converted to appropriate types
#     for col in expected_columns:
#         car_df[col] = pd.to_numeric(car_df[col], errors='coerce').fillna(0).astype(int)


#     # ✅ Exclude 'CarID' while inserting (since it's auto-increment)
#     insert_query = """
#     INSERT INTO Cars (Make, Model, CarType, Mileage_kmpl, Year_Of_Manufacture, Price_Per_Hour_INR, Seats, Fuel_Policy, AC, Transmission, Luggage_Capacity, City, Agency, Base_Fare, LocationID, Unlimited_Mileage, Free_Cancellation, Ratings) 
#     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#     """

#     # ✅ Convert DataFrame to list of tuples for insertion
#     data_to_insert = car_df.iloc[:, 1:].to_records(index=False).tolist()  # Excludes CarID (index 0)

#     # ✅ Insert data in chunks to avoid packet size issues
#     chunk_size = 500  # Adjust chunk size based on your system performance
#     for i in range(0, len(data_to_insert), chunk_size):
#         cursor.executemany(insert_query, data_to_insert[i:i+chunk_size])
#         conn.commit()

#     print("✅ Data successfully inserted into Car table.")

# except mysql.connector.Error as err:
#     print(f"❌ DatabaseError: {err}")

# finally:
#     # ✅ Close the connection
#     if 'cursor' in locals():
#         cursor.close()
#     if 'conn' in locals():
#         conn.close()



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


