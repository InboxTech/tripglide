import mysql.connector
import pandas as pd

# Database Configuration (For XAMPP MySQL)
db_config = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "",
    "database": "main"
}

try:
    # Establish database connection
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Load the CSV file into a DataFrame
    hotels_df = pd.read_csv(r"C:\Users\dell\Downloads\hotel_booking.csv")
    main_df = pd.read_csv(r"C:\Users\dell\Downloads\hotel_booking.csv")

    # ✅ Rename DataFrame columns to match MySQL table structure
    hotels_df.rename(columns={
        "travelCode": "travelCode",
        "User_ID": "User_ID",
        "Departure": "Departure",
        "Arrival": "Arrival",
        "Assigned_hotel": "Assigned_hotel",
        "Stars" : "Stars",
        "Check_in_Date" : "Check_in_Date",
        "Bedroom_type": "Bedroom_type",
        "Room_Price_Per_Night": "Room_Price_Per_Night",
        "Number_of_Adults" : "Number_of_Adults",
        "Number_of_Children": "Number_of_Children",
        "Number_of_Bedrooms": "Number_of_Bedrooms",
        "Total_cost_per_night" : "Total_cost_per_night",
        "Amenities": "Amenities",
        "Days_of_Stay":"Days_of_Stay",
        "Total_cost": "Total_cost",
        "Check_out_date" : "Check_out_date"
    }, inplace=True)

    # ✅ Ensure numeric columns are converted to appropriate types
    numeric_columns = ["travelCode", "User_ID"]
    for col in numeric_columns:
        hotels_df[col] = pd.to_numeric(hotels_df[col], errors='coerce').fillna(0).astype(int)

    # ✅ Exclude 'CarID' while inserting (since it's auto-increment)
    insert_query = """
    INSERT INTO hotels (travelCode, User_ID, Departure, Arrival, Assigned_hotel, Stars, Check_in_Date, Bedroom_type, Room_Price_Per_Night, Number_of_Adults, Number_of_Children, Number_of_Bedrooms, Total_cost_per_night, Amenities, Days_of_Stay, Total_cost, Check_out_date)
     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,  %s, %s, %s, %s)
    """

    # ✅ Convert DataFrame to list of tuples for insertion
    data_to_insert = [tuple(row) for row in hotels_df.itertuples(index=False, name=None)]

    # ✅ Insert data in chunks to avoid packet size issues
    chunk_size = 500  # Adjust chunk size based on your system performance
    for i in range(0, len(data_to_insert), chunk_size):
        cursor.executemany(insert_query, data_to_insert[i:i+chunk_size])
        conn.commit()

    print("✅ Data successfully inserted into hotels table.")

except mysql.connector.Error as err:
    print(f"❌ DatabaseError: {err}")

finally:
    # ✅ Close the connection
    if 'cursor' in locals():
        cursor.close()
    if 'conn' in locals():
        conn.close()