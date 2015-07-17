var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    section: 'index',
    title: 'White Knight Implants',
    company_name: req.app.get('company_name')
  });
});

router.get('/lab', function(req, res, next) {
  res.render('lab', {
    section: 'lab',
    title: 'The Lab' ,
    company_name: req.app.get('company_name')
  });
});

router.get('/itero', function(req, res, next) {
  res.render('itero', {
    section: 'itero',
    title: 'Itero',
    company_name: req.app.get('company_name')
  });
});

router.get('/ceramics', function(req, res, next) {
  res.render('ceramics', {
    section: 'ceramics',
    title: 'Ceramics',
    company_name: req.app.get('company_name')
  });
});

router.get('/implants', function(req, res, next) {
  res.render('implants', {
    section: 'implants',
    title: 'Implants',
    company_name: req.app.get('company_name')
  });
});

router.get('/removable_prosthetics', function(req, res, next) {
  res.render('removable_prosthetics', {
    section: 'removable_prosthetics',
    title: 'Removable Prosthetics',
    company_name: req.app.get('company_name')
  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {
    section: 'contact',
    title: 'Contact us',
    company_name: req.app.get('company_name')
  });
});

module.exports = router;
