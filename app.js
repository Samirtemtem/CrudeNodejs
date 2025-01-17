var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Step 3.1
const mongo = require("mongoose");

//Step 3.2
const mongoconnection = require("./config/database.json");

//Step 3.3
mongo.connect(mongoconnection.url).
then(() => {
  console.log("DataBase Connected Pour la clasee 4TWIN5!!");
}).
catch((err) => {
  console.log(err);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var equipesRouter = require('./routes/equipes');
var joueursRouter = require('./routes/joueurs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//Step2 
app.use('/equipes', equipesRouter);
app.use('/joueurs', joueursRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// error handler

module.exports = app;
