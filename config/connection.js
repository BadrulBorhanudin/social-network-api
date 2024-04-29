// Import the 'connect' function and the 'connection' object from the 'mongoose' package
const { connect, connection } = require('mongoose');

// Define the connection string for the MongoDB database
const connectionString = 'mongodb://localhost:27017/badrulDB';

// Connect to the MongoDB database using the provided connection string
connect(connectionString);

// Export the 'connection' object for use in other parts of the application
module.exports = connection;
