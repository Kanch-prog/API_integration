//application listens for POST requests to "/api/storeCustomerDetails", stores customer details in a MySQL database, and serves static files from a "public" directory. It's a basic 
const express = require("express");
const mysql = require("mysql2");
const app = express();//Create an Express application and set the port to 3000
const PORT = 3000;
const path = require("path"); //Path module is used to work with file paths.

// Set up a connection to the MySQL database:
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GoodLuck123!",
  database: "DIALER",
});

// establishes a connection to the MySQL database and logs the result. 
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

//  middleware is used to serve static files from the "public" directory. It allows you to host static assets like HTML, CSS, and JavaScript files.
app.use(express.static(path.join(__dirname, "public")));
// middleware is used to parse JSON request bodies. It's necessary for handling JSON data sent in POST requests.
app.use(express.json());
// Handle POST request to store customer data
app.post("/api/storeCustomerDetails", (req, res) => {//a route that listens for POST requests at "/api/storeCustomerDetails".
    const { name, email, phone, message } = req.body;//extracts customer data from the JSON request body (name, email, phone, and message).
  
    const insertQuery = "INSERT INTO customers (name, email, phone, message) VALUES (?, ?, ?, ?)";//prepares an SQL query to insert this data into a table called "customers" in the MySQL database.
    const values = [name, email, phone, message];
  
    db.query(insertQuery, values, (err, result) => {//uses the MySQL connection to execute the query. If there's an error, it returns a 500 status code and an error message. Otherwise, it returns a 200 status code and a success message.
      if (err) {
        console.error("Error storing customer data:", err);
        res.status(500).json({ message: "Error storing customer data" });
        return;
      }
      res.status(200).json({ message: "Customer data stored successfully" });
    });
  });
  

//starts the Express server and listens on port 3000.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
