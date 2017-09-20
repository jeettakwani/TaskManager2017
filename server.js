var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var mongoose = require('mongoose');
var app = express();
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');


var connectionString = 'mongodb://127.0.0.1:27017/taskManager';

var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

multer();
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/src/client'));

var ipaddress = '127.0.0.1';
var port = 4000;

require('./app.js')(app, db, mongoose);
app.listen(port, ipaddress);