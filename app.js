const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
require('./routes/index').routes.forEach(route => {
  app.use('/', route);
});

// catch 404 and response with 404 message
app.use((_req, res) => {
  res.status(404);
  res.json({ message: '404 Not Found' });
});

module.exports = app;
