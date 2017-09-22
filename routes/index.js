var express = require('express');
var router = express.Router();

function createTitlePrefix(req, section) {
  return req.app.get('company_name') + ' | CT Dental Lab | ' + section;
}

router.get('/', function(req, res, next) {
  res.render('index', {
    section: 'index',
    title: req.app.get('company_name') + ' | CT Dental Lab',
    company_name: req.app.get('company_name')
  });
});

////////////////////////
/// Featured Promo ////
///////////////////////

router.get('/featured-promotion', function(req, res, next) {
  res.render('featured-promotion', {
    section: 'featured-promotion',
    title: createTitlePrefix(req, 'Featured Promotion'),
    header_text: 'Featured Promotion',
    company_name: req.app.get('company_name')
  });
});


router.get('/shipping-instructions', function(req, res, next) {
  res.render('shipping-instructions', {
    section: 'shipping-instructions',
    title: createTitlePrefix(req, 'Shipping Instructions'),
    header_text: 'Shipping Instructions',
    company_name: req.app.get('company_name')
  });
});

router.get('/technique-books', function(req, res, next) {
  var books = [
        {
          title: 'Delayed Immediate Implant Prosthesis',
          pdf: '24 Hr. Delayed.pdf',
          thumb: 'delayed.png'
        },
        {
          title: 'Camstructsure',
          pdf: 'Camstructsure Hybrid.pdf',
          thumb: 'camstructure.png'
        },
        {
          title: 'Locator Overdenture',
          pdf: 'locator042515.pdf',
          thumb: 'locator.png'
        },
        {
          title: 'Mesiostructure',
          pdf: 'Mesiostructure and PFMs.pdf',
          thumb: 'mesiostructure.png'
        },
        {
          title: 'Bar Overdenture',
          pdf: 'Overdenture.pdf',
          thumb: 'overdenture.png'
        },
        {
          title: 'Encode and Beyond',
          pdf: 'uscg encode.pdf',
          thumb: 'encode.png'
        }
      ];

  res.render('technique-books', {
    books: books,
    section: 'technique-books',
    title: createTitlePrefix(req, 'Technique Books'),
    header_text: 'Technique Books',
    company_name: req.app.get('company_name')
  });
});

router.get('/contact-us', function(req, res, next) {
  res.render('contact-us', {
    section: 'contact-us',
    title: createTitlePrefix(req, 'Contact Us'),
    header_text: 'Contact Us',
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
    title: createTitlePrefix(req, 'The Lab'),
    header_text: 'The Lab',
    company_name: req.app.get('company_name')
  });
});

router.get('/the-owners', function(req, res, next) {
  res.render('the-owners', {
    section: 'the-owners',
    title: createTitlePrefix(req, 'The Owners'),
    header_text: 'The Owners',
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
    title: createTitlePrefix(req, 'Lab Photos'),
    header_text: 'Lab Photos',
    company_name: req.app.get('company_name')
  });
});

//////////////////
// Lab Services //
/////////////////

router.get('/itero', function(req, res, next) {
  res.render('itero', {
    section: 'itero',
    title: createTitlePrefix(req, 'iTero'),
    header_text: 'iTero',
    company_name: req.app.get('company_name')
  });
});

router.get('/ceramics', function(req, res, next) {
  res.render('ceramics', {
    section: 'ceramics',
    title: createTitlePrefix(req, 'Ceramics'),
    header_text: 'Ceramics',
    company_name: req.app.get('company_name')
  });
});

router.get('/implants', function(req, res, next) {
  res.render('implants', {
    section: 'implants',
    title: createTitlePrefix(req, 'Implants'),
    header_text: 'Implants',
    company_name: req.app.get('company_name')
  });
});

router.get('/removable-prosthetics', function(req, res, next) {
  res.render('removable-prosthetics', {
    section: 'removable-prosthetics',
    title: createTitlePrefix(req, 'Removable Prosthetics'),
    header_text: 'Removable Prosthetics',
    company_name: req.app.get('company_name')
  });
});

router.get('/secure', function(req, res, next) {
  res.render('secure', {
    section: 'admin',
    title: 'Hello there',
    header_text: 'You made it',
    company_name: req.app.get('company_name')
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    section: 'site-login',
    title: 'Hello there',
    header_text: 'Admin Login',
    company_name: req.app.get('company_name')
  });
});

router.post('/login', function(req, res, next) {
  if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
    console.log('auth = ' + req.session.authenticated);
    req.session.authenticated = true;
    res.redirect('secure');
  } else {
    res.render('login', {
      section: 'site-login',
      title: 'Login error',
      header_text: 'Admin Login',
      company_name: req.app.get('company_name'),
      msg: 'Username and/or password is in correct'
    });
  }
});

///////////////////////
// Erroneous Route(s)//
//////////////////////

router.get('/meet-our-team', function(req, res, next) {
  res.redirect('/the-owners');
});

module.exports = router;
