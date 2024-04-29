// Import the Router class from Express
const router = require('express').Router();

// Import the API routes from a separate file or directory
const apiRoutes = require('./api');

// Mount the API routes under the '/api' prefix
router.use('/api', apiRoutes);

// Define a fallback route handler for any routes that are not matched by the API routes
router.use((req, res) => {
  return res.status(404).send('<h1>404 Error!</h1>'); // Send a 404 error response with a simple HTML message
});

// Export the router for use in other parts of the application
module.exports = router;
