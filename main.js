var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');

// - Conexion a la base de datos

var con = require('./http/connection');

// require('./conf/auth')(app);

// - Middlewares

var lessMiddleware = require('less-middleware')

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, 'assets', 'icoaching.ico')))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(flash());

//- Rutas

app.use('/', require('./http/routes'));
app.use('/', require('./http/routes/routeUsuario'));
app.use('/', require('./http/routes/routeImagenes'));

app.use('/', require('./http/routes/routeArea'));
app.use('/', require('./http/routes/routeTipo'));
app.use('/', require('./http/routes/routeModalidad'));
app.use('/', require('./http/routes/routeEvento'));
app.use('/', require('./http/routes/routeServicio'));
app.use('/', require('./http/routes/routeProspecto'));

app.use(session({secret: '01f4845/564564/6@@fas588--[[}++', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }});

app.use(lessMiddleware(__dirname + '/assets'));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'http')));

module.exports = app;
