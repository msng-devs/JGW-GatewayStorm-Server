var express = require('express');
require('express-async-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
var csp = require('helmet-csp');
var hpp = require('hpp');
var morgan= require('morgan');
var compression = require('compression');
var app = express();
var dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'local';
const envPath = path.join(__dirname, `/env/.env.${env}`);
console.log(envPath);
dotenv.config({ path: envPath });

app.set('view engine', 'ejs');

const firebaseUrls = [
    'https://identitytoolkit.googleapis.com',
    'https://securetoken.googleapis.com',
    'https://apis.google.com',
    process.env.FIREBASE_AUTH_DOMAIN,
    process.env.SERVICE_DOMAIN,
    process.env.GATE_WAY_DOMAIN,
    'http://localhost:3000'
];

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", ...firebaseUrls],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'", ...firebaseUrls],
            fontSrc: ["'self'", "https:", "data:"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: [process.env.FIREBASE_AUTH_DOMAIN,process.env.SERVICE_DOMAIN,process.env.GATE_WAY_DOMAIN],
        },
    },
}));
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

app.use('/', express.static(path.join(__dirname, 'src/public/dist')));

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, 'src/public/dist/index.html'));
});
//middleware
const {exceptionHandler} = require('./src/middleware/exceptionHandler.middleware');
app.use(exceptionHandler);


module.exports = app;



