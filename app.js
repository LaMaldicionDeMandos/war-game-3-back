require('dotenv').config();
var express = require('express');
const cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const worldRouter = require('./routes/wolrd.route');
const countryRouter = require('./routes/country.route');

const app = express();

const USE_WHITE_LIST = process.env.USE_CORS_ORIGIN_WHITE_LIST === 'true';

const whitelist = ["https://localhost:3000", "https://localhost/", "https://localhost"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!USE_WHITE_LIST || !origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
};
app.use(cors(corsOptions));
app.use(express.static( 'public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', worldRouter);
app.use('/countries', countryRouter);

module.exports = app;
