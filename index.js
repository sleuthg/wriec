#!/usr/bin/env node

// Set/get process environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || '5000';

// Module dependencies.
var express = require('./config/express');
//var mongoose = require('./config/mongoose');

// Set up access to the database that keeps track of mileage
//var db = mongoose();  // make sure this is called before initializing the app

// Initialize the Express REST-ful API
var app = express();

var port = normalizePort(process.env.PORT);
app.listen(process.env.PORT);
module.exports = app;

if (process.env.NODE_ENV === 'development') {
  console.log('Listening at http://localhost:%s', port);
} else console.log('Listening at :%s', port);

// ---- Helper Functions ---- //

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) return val; // named port
  if (port >= 0) return port; // port number
  return false; // no good
}
