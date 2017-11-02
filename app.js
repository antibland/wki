/*  How do I start the app?
    $ npm start

    Note: Make sure livereload Chrome plugin is started
*/

var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var nodemailer = require('nodemailer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var session = require('express-session');
var mongoose = require('mongoose');

var app = express();

function checkAuth (req, res, next) {
  const blacklist = ['/secure', '/promo'];
  const unauthenticated = (!req.session || !req.session.authenticated);

  if (blacklist.includes(req.url) && unauthenticated ||
    ~req.url.indexOf('/promo') && unauthenticated) {
    res.render('unauthorized',
      {
        status: 403,
        section: 'unauthorized',
        title: 'Unauthorized',
        header_text: 'No dice',
        company_name: req.app.get('company_name')
      });

    return;
  }

  next();
}

// connect to Mongo when the app initializes
if (app.get('env') === 'development') {
  mongoose.connect('mongodb://localhost/wki-admin', { useMongoClient: true });
  require('dotenv').config()
} else {
  mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds147274.mlab.com:47274/wki-admin', { useMongoClient: true })
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compression());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // TODO: set to true at the end
}));

app.use(checkAuth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// set up the RESTful API, handler methods are defined in api.js
var api = require('./controllers/api.js');
app.post('/promo', api.post);
app.post('/promo/:id/update', api.update); // kind of shitty—-should be app.put
app.get('/promo/:id/delete', api.delete); // kind of shitty—-should be app.delete
app.post('/promo/set_live', api.set_live);
app.get('/promo', api.list);


app.post('/contact-us', (req, res) => {

  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'zoho',
    auth: {
      user: 'howard@whiteknightimplants.com',
      pass: process.env.zoho_pw || ""
    }
  });

  var phone = req.body.phone.length > 0 ? req.body.phone : "Not provided.";

  var mailObj = {
    from: 'From: ' + req.body.name + '\n',
    email: 'Email: ' + req.body.email + '\n',
    phone: 'Phone: ' + phone,
    message: '\n\n' + req.body.message
  }

  var mailOptions = {
    from: 'howard@whiteknightimplants.com', // sender address
    to: 'howard@whiteknightimplants.com',
    subject: 'Website Inquiry: ' + req.body.reason,
    text: mailObj.from + mailObj.email + mailObj.phone + mailObj.message
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.render('contact-us', {
        msg: 'Something went wrong. Please try again.',
        err: true,
        section: 'contact-us',
        title: 'Contact Us',
        subject: req.body.reason || "",
        name: req.body.name || "",
        email: req.body.email || "",
        phone: req.body.phone || "",
        message: req.body.message || "",
        company_name: req.app.get('company_name')
      });
    } else {
      res.render('contact-us', {
        msg: 'Message sent.',
        err: false,
        section: 'contact-us',
        title: 'Contact Us',
        subject: req.body.reason || "",
        company_name: req.app.get('company_name')
      });
    }
  });
});

// just render the 404 view
app.use((req, res, next) => {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', {
      url: req.url,
      company_name: req.app.get('company_name')
    });
    return;
  }
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.locals.company_name = 'White Knight Implants';
app.locals.promo = null;

module.exports = app;
