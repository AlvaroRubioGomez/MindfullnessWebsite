var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var cookieSession = require('cookie-session');
const passport = require('passport');


var homeRouter = require('./routes/homeRoutes');
var aboutRouter = require('./routes/aboutRoutes');
var dbRouter = require('./routes/dbRoutes');
var authRouter = require('./routes/authRoutes');
//var tools = require('./public/javascripts/tools');
const keys = require('./config/keys');


var app = express();

// Static files
app.use(express.static('public'));

// View engine set up
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}))

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Set up routes
app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/db', dbRouter);
app.use('/auth', authRouter);


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

app.listen('3000', () => {
  console.log('Server started on port 3000');
});



