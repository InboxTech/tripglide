import React, { useState, useEffect } from 'react';
import axios from 'axios';  // or use fetch if you prefer

const FlightList = () => {
  // State to hold the flight data
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data from your Flask API
  useEffect(() => {
    // Replace with your actual Flask API URL
    axios.get('http://localhost:5000/')
      .then(response => {
        setFlights(response.data); // Store the flight data
        setLoading(false);  // Set loading to false
      })
      .catch(error => {
        setError('Error fetching data'); // Handle errors
        setLoading(false);
      });
  }, []);

  // Render the data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Flight List</h1>
      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Class</th>
            <th>Seat Availability</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.flight_number}>
              <td>{flight.flight_number}</td>
              <td>{flight.airline}</td>
              <td>{flight.departure_airport}</td>
              <td>{flight.arrival_airport}</td>
              <td>{flight.departure_time}</td>
              <td>{flight.arrival_time}</td>
              <td>{flight.duration}</td>
              <td>{flight.price}</td>
              <td>{flight.class}</td>
              <td>{flight.seat_availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightList;