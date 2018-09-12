const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const initialData = require('./routes/initial_data');
const foodData = require('./routes/food_data');
const communalData = require('./routes/communal_data');
const transportData = require('./routes/transport_data');
const otherData = require('./routes/other_data');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use('/initial-data', initialData);
app.use('/food-data', foodData);
app.use('/communal-data', communalData);
app.use('/transport-data', transportData);
app.use('/other-data', otherData);

const frontDir = path.join(__dirname, '../', 'front-end/dist');
global.frontDir = frontDir;
app.use(express.static(frontDir))

app.get('*', (req, res) => {
  res.sendFile(path.join(global.frontDir + '/index.html'));
  console.log("Had set connected");
});

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
