// Core node modules
var path = require('path');  // utilities for working with file and directory paths
var url = require('url');    // parse URL's

// Required node modules (alphabetical order) for the Express application
var bodyParser = require('body-parser');       // support to parse body (JSON, raw, text, URL-encoded)
var express = require('express');              // for Model-View-Controller server
var favicon = require('serve-favicon');        // used to serve up favicon images
var logger = require('morgan');                // used to log requests to the console

// Required loom files
var config = require('./config.js');           // configures all of the settings and depends on chose environment

// ------------------------------- //
// --- The Express application --- //
// ------------------------------- //

// REST-ful API and serve up the single page application view
module.exports = function() {
  var app = express();
  var err;

  // Serve favicon: https://github.com/expressjs/serve-favicon
  // Put this before the logger to exclude /favicon from logs
  app.use(favicon(path.join(__dirname, '../public/favicons/favicon.ico')));

  // Use morgan to log all server requests to the console.
  // The 'dev' argument configures morgan to be concise output colored by response status for development use.
  // The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection
  // codes, and uncolored for all other codes.
  // @todo determine if the logger should be set to something besides 'dev' in production mode
  app.use(logger('dev'));

  // Middleware to parse the request body: https://github.com/expressjs/body-parser
  // A new body object containing the parsed data is populated on the request object (i.e. req.body).
  // @todo: this is not the most recommended way to implement body parsers, instead implement them as route-specific.

  // parse application/json
  app.use(bodyParser.json());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // Add static directory to client-side files
  app.use(express.static(path.join(__dirname, '../public')));

  // Set up the views directory and view engine.
  app.set('views', './app/views');
  app.set('view engine', 'pug');

  // *** Public routes requiring no authentication *** //

  // main home page
  require('../app/routes/index.server.routes.js')(app);

  // Catch 404 and forward to error handler
  app.use(function(req,res,next) {
    err = new Error('Page Not Found');
    err.status = 404;
    next(err);
  });

  // Log any errors
  app.use(function(err,req,res,next) {
    console.error(err.stack);
    next(err);
  });

  // Send message of any client errors
  app.use(function(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something blew up!!' });
    } else {
      next(err);
    }
  });

  // "Catch all" Error handler
  app.use(function(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.status || 500);
    res.render('error', { error: err });
  });

  return app;
};
