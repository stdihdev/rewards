const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const apiRoutes = require('./api/routes');
require('./config/passport-config');

// view engine setup
var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Authentication middleware
// app.use(session({
//   secret: process.env.PASSPORT_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: false,
//   },
// }));
app.use(passport.initialize());
// app.use(passport.session());

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
