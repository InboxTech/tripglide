#car-rental table updated
import mysql.connector
import pandas as pd

# Database Configuration (For XAMPP MySQL)
db_config = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "",
    # "port": 3307,
    "database": "main"
}

try:
    # Establish database connection
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Load the CSV file into a DataFrame
    file_path = r"D:\xampp\htdocs\Inbox\CAR_RENTAL.csv"
    car_df = pd.read_csv(file_path)

    # ✅ Rename DataFrame columns to match MySQL table structure
    car_df.rename(columns={
        "travelCode": "Travel_Code",
        "user_id": "User_ID",
        "Pickup_Location": "Pickup_Location",
        "rental_date": "Rental_Date",
        "duration": "Duration",
        "return_date": "Return_Date",
        "Car_Id": "Car_Id",
        "total_amount": "Total_Amount",
        "Duration_Hours": "Duration_Hours",
        "Total_Minutes": "Total_Minutes",
        "Days": "Days",
        "Hours": "Hours",
        "Formatted_Duration": "Formatted_Duration",
        "Duration_Days": "Duration_Days"
    }, inplace=True)

    # ✅ Print column names after renaming to verify
    print("After renaming columns:", car_df.columns.tolist())

    # ✅ Check for any missing columns before processing
    expected_columns = [
        "Travel_Code", "User_ID", "Pickup_Location", "Rental_Date", "Duration",
        "Return_Date", "Car_Id", "Total_Amount", "Duration_Hours", "Total_Minutes",
        "Days", "Hours", "Formatted_Duration", "Duration_Days"
    ]
    missing_columns = [col for col in expected_columns if col not in car_df.columns]
    if missing_columns:
        raise KeyError(f"❌ Missing columns: {missing_columns}")

    # ✅ Convert DataFrame to list of tuples for insertion (include all columns)
    data_to_insert = car_df.to_records(index=False).tolist()

    # ✅ Verify data length matches expected columns
    print("Sample data length:", len(data_to_insert[0]))  # Should print 14

    # ✅ SQL query for insertion
    insert_query = """
    INSERT INTO rentals (
        Travel_Code, User_ID, Pickup_Location, Rental_Date, Duration, Return_Date,
        Car_Id, Total_Amount, Duration_Hours, Total_Minutes, Days, Hours,
        Formatted_Duration, Duration_Days
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    # ✅ Insert data in chunks to avoid packet size issues
    chunk_size = 500  # Adjust chunk size based on your system performance
    for i in range(0, len(data_to_insert), chunk_size):
        cursor.executemany(insert_query, data_to_insert[i:i + chunk_size])
        conn.commit()

    print("✅ Data successfully inserted into Car Rental table.")

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