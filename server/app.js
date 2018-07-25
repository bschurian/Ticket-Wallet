var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ticketsRouter = require('./routes/tickets');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter', (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }

    // // feed some dummy data in DB.
    // dummyData();
  });
}

import User from './models/user';
const ticket1 = { title: 'Kinoticket', cuid: 'cikqgkv4q01ck7453ualEn3hk', content: 'Kinoplex 24 Film: "Krieg der Sterne"' };
const ticket2 = { title: 'Bahnticket', cuid: 'cikqgkv4q01ck7453ualdn3hl', content: 'Bahnticket München-Berlin 12.3 Zug 54321' };
const ticket3 = { title: 'Konzert', cuid: '321', content: 'Michael Jackson' };
const newUser = new User({
  name: 'Frank',
  googleid: '1234',
  cuid: 'cikqgkv4q01ck7453ualdn3hd',
  tickets: [
    ticket1, ticket2, ticket3
  ],
});
User.create([newUser], (error) => {
  if (!error) {
    console.log('ready to go....');
  } else {
    console.log('error creating user');
  }
});

app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send();
});

module.exports = app;
