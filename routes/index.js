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

router.get('/technique-books', function(req, res, next) {
  var resource_path = '/technique-books/',
      books = {};
      books['Delayed Immediate Implant Prosthesis'] = resource_path + '24 Hr. Delayed.pdf';
      books['Camstructsure'] = resource_path + 'Camstructsure Hybrid.pdf';
      books['Locator Overdenture'] = resource_path + 'locator042515.pdf';
      books['Mesiostructure'] = resource_path + 'Mesiostructure and PFMs.pdf';
      books['Bar Overdenture'] = resource_path + 'Overdenture.pdf';
      books['Encode and Beyond'] = resource_path + 'uscg encode.pdf';

  res.render('technique-books', {
    books: books,
    section: 'technique-books',
    title: 'Technique Books',
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
  var fs            = require('fs'),
      file_names    = fs.readdirSync('./public/images/lab_photos'),
      len           = file_names.length,
      srubbed_names = [],
      file_ext,
      file_name;

  for (var i = 0; i < len; i++) {
    file_name = file_names[i];
    file_ext = file_name.split('.')[1].toLowerCase();

    if ((file_ext === 'jpg' || file_ext === 'jpeg') && !~file_name.indexOf('@2x')) {
      srubbed_names.push(file_name);
    }
  }

  res.render('lab-photos', {
    images: srubbed_names,
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
    title: 'iTero',
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

///////////////////////
// Erroneous Route(s)//
//////////////////////

router.get('/meet-our-team', function(req, res, next) {
  res.redirect('/the-owners');
});

module.exports = router;
