var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const config = require('config');

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.dbconn || config.get('Database.conn'), {useNewUrlParser: true, useUnifiedTopology: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/v1/users');
const apiV1TranfsersRouter = require('./routes/api/v1/transfers');
const apiV1AcountsRouter = require('./routes/api/v1/acounts');

const passport =  require('./passport/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/api/v1/users', passport.authenticate('jwt', { session: false })  ,usersRouter);
app.use('/api/v1/transfers', passport.authenticate('jwt', { session: false }) , apiV1TranfsersRouter);
app.use('/api/v1/acounts', apiV1AcountsRouter);

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
