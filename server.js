const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5001;

// Enable CORS for all domains
app.use(cors());

// Set up MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Your MySQL username
    password: "", // Your MySQL password
    database: "tripglide" // Your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database: " + err.stack);
        return;
    }
    console.log("Connected to the MySQL database");
});

// API route to get data from the MySQL database
app.get("/tripglide", (req, res) => {
    db.query("SELECT * FROM flights", (err, result) => {
        if (err) {
            console.error("Database query error: ", err);
            res.status(500).json({ error: "Database query failed" });
            return;
        }

        console.log("Query result:", result);  // Log query result for debugging

        // If no flights are found
        if (result.length === 0) {
            res.status(404).json({ message: "No flights found" });
            return;
        }

        res.json(result);  // Send the result as JSON
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://192.168.29.67:${port}`);
});
