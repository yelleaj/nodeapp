const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import and use the routers
const authRouter = require('./routes/Authentication');
const formRouter = require('./routes/form');
const dashboardRouter = require('./routes/Dashboard');

app.use('/auth', authRouter); // Authentication routes
app.use('/api', formRouter);  // Form submission routes
app.use('/dashboard', dashboardRouter); // Dashboard routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
