var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var nodemailer = require('nodemailer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.post('/contact-us', function(req, res) {

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
  transporter.sendMail(mailOptions, function(error, info) {
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('company_name', 'White Knight Implants, LLC');

module.exports = app;
