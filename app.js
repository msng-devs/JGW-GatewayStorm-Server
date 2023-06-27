var express = require('express');
require('express-async-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
var hpp = require('hpp');
var morgan= require('morgan');
var compression= require('compression');
var app = express();

app.use(helmet())
app.use(hpp())
app.use(morgan('combined'))
app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//set route
app.use('/api/v1/service', require('./src/routes/apiRoute.route'));
app.use('/api/v1/service', require('./src/routes/service.route'));
app.use('/api/v1/role', require('./src/routes/role.route'));
app.use('/api/v1/method', require('./src/routes/method.route'));
app.use('/api/v1/routeOption', require('./src/routes/routeOption.route'));
app.use('/api/v1/ping', require('./src/routes/ping.route'));
app.use('/api/v1/refresh', require('./src/routes/refresh.route'));
app.use('/', require('./src/routes/index.route'));
//middleware
const {exceptionHandler} = require('./src/middleware/exceptionHandler.middleware');
app.use(exceptionHandler);


module.exports = app;



