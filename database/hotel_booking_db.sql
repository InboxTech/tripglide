CREATE DATABASE hotel_booking_db;
USE hotel_booking_db;
CREATE TABLE hotel_bookings (
    travelCode int,
    User_ID int,
    Departure varchar(25),
    Arrival varchar(25),
    Assigned_hotel varchar(25),
    Stars int,
    Check_in_Date date,
    Bedroom_type varchar(25),
    Room_Price_Per_Night int,
    Number_of_Adults int,
    Number_of_Children int,
    Number_of_Bedrooms int,
    Total_cost_per_night int,
    Amenities varchar(25),
    Days_of_Stay int,
    Total_cost int,
    Check_out_date date
    );