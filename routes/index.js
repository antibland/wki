var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    section: 'index',
    title: 'White Knight Implants',
    company_name: req.app.get('company_name')
  });
});

/* GET resrouces page. */
router.get('/resources', function(req, res, next) {
  res.render('resources', {
    section: 'resources',
    title: 'Resources',
    company_name: req.app.get('company_name')
  });
});

/* GET family page */
router.get('/family', function(req, res, next) {
  res.render('family', {
    section: 'family',
    title: 'Our family' ,
    company_name: req.app.get('company_name')
  });
});

/* GET services page */
router.get('/services', function(req, res, next) {
  res.render('services', {
    section: 'services',
    title: 'Services',
    company_name: req.app.get('company_name')
  });
});

/* GET implants page */
router.get('/implants', function(req, res, next) {
  res.render('implants', {
    section: 'implants',
    title: 'Implants',
    company_name: req.app.get('company_name')
  });
});

/* GET contact page */
router.get('/contact', function(req, res, next) {
  res.render('contact', {
    section: 'contact',
    title: 'Contact us',
    company_name: req.app.get('company_name')
  });
});

module.exports = router;
