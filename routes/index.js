var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    section: 'index',
    title: 'White Knight Implants',
    company_name: req.app.get('company_name')
  });
});

router.get('/about-us', function(req, res, next) {
  res.render('about-us', {
    section: 'about-us',
    title: 'About Us',
    company_name: req.app.get('company_name')
  });
});

router.get('/the-lab', function(req, res, next) {
  res.render('the-lab', {
    section: 'the-lav',
    title: 'The Lab',
    company_name: req.app.get('company_name')
  });
});

router.get('/lab-photos', function(req, res, next) {
  res.render('lab-photos', {
    section: 'lab-photos',
    title: 'Lab Photos',
    company_name: req.app.get('company_name')
  });
});

router.get('/services', function(req, res, next) {
  res.render('services', {
    section: 'services',
    title: 'Services',
    company_name: req.app.get('company_name')
  });
});

router.get('/resources', function(req, res, next) {
  res.render('resources', {
    section: 'resources',
    title: 'Resources',
    company_name: req.app.get('company_name')
  });
});

router.get('/contact-us', function(req, res, next) {
  res.render('contact-us', {
    section: 'contact-us',
    title: 'Contact Us',
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

module.exports = router;
