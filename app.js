const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./utiles/config');
const logger = require('./utiles/logger');
const adminController = require('./controllers/admin');
const middleware = require('./utiles/middlewear')

const cors = require('cors')


// Middleware
app.use(cors())
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(middleware.requestLogger)

// Database Connection config.mongodbEirlyUrl
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  logger.info('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

// Routes
app.use(express.static("build"))
app.use('/api', adminController);


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
