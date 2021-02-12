const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');


const newMovieRouter = require('./routes/new-movie');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dashRouter = require('./routes/dashboard');
const anotherRouter = require('./routes/another-movie');

const app = express();

// Passport Config
require('./config/passport');

// Session 
app.use(session({
  secret: 'shhh secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo Connection
mongoose.connect('mongodb://localhost:27017/chapters',
 {useNewUrlParser: true}, 
 { useUnifiedTopology: true })
 .catch(error => handleError(error));

// Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// App Configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// Global variables 
// Borrowed middleware: bradtraversy/node_passport_login
app.use((req, res, next) => {
  res.locals.message = req.flash('logout');
  res.locals.validation = req.flash('error');
  next();
});

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/new-movie', newMovieRouter);
app.use('/dashboard', dashRouter);
app.use('/another-movie', anotherRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
