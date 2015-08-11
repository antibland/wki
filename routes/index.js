var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    section: 'index',
    title: 'White Knight Implants',
    company_name: req.app.get('company_name')
  });
});


router.get('/shipping-instructions', function(req, res, next) {
  res.render('shipping-instructions', {
    section: 'shipping-instructions',
    title: 'Shipping Instructions',
    company_name: req.app.get('company_name')
  });
});

router.get('/contact-us', function(req, res, next) {
  res.render('contact-us', {
    section: 'contact-us',
    title: 'Contact Us',
    subject: req.query.subject || "",
    company_name: req.app.get('company_name')
  });
});

//////////////
// About Us //
/////////////

router.get('/the-lab', function(req, res, next) {
  res.render('the-lab', {
    section: 'the-lab',
    title: 'The Lab',
    company_name: req.app.get('company_name')
  });
});

router.get('/the-owners', function(req, res, next) {
  res.render('the-owners', {
    section: 'the-owners',
    title: 'The Owners',
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

//////////////////
// Lab Services //
/////////////////

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
