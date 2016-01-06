'use strict';

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');

//models
var User = require('../app/models/user');

var router = express.Router();
var app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//setup router
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
//    console.log(req);
    next();
});

mongoose.connect('mongodb://localhost:27017/wayAlarm');

/**
 * Loads all routes from controllers folder
 */
function initRoutes() {
    var controllersFolder = path.join(__dirname, 'controllers/');
    fs.readdir(controllersFolder, function (error, files) {
        if (error) {
            console.log('Error loading routes', error.stack);
        }

        files.forEach(function (file) {
            var name = file.replace('.js', '');
            require(controllersFolder + name);
        });
    });
}

initRoutes();

app.listen(8080);
console.log('Server running at: http://localhost:8080');

// Make the app available to the outside
module.exports = app;