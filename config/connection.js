const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/badrulDB';

connect(connectionString);

module.exports = connection;