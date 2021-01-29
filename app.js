const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

// Import file route
const routes = require('./src/routes');

const DB = require('./src/config/database');
const sequelize = new Sequelize(DB.development);

//test database connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

app.use(passport.initialize()); // Passport middleware
require("./src/config/passport")(passport); // Passport config

//Load routes
app.use(routes);

module.exports = app;
