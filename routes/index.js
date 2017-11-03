const express = require('express');
const router = express.Router();

function createTitlePrefix(req, section) {
  return req.app.locals.company_name + ' | CT Dental Lab | ' + section;
}

router.get('/*', (req, res, next) => {
  const Promo = require('../models/promo.js');

  Promo.findOne({ live: true }, (err, promo) => {
    req.app.locals.promo = promo;
  });

  next();
});

router.get('/', (req, res, next) => {
  res.render('index', {
    section: 'index',
    title: req.app.locals.company_name + ' | CT Dental Lab'
  });
});

////////////////////////
/// Featured Promo ////
///////////////////////

router.get('/featured-promotion', (req, res, next) => {
  res.render('featured-promotion', {
    section: 'featured-promotion',
    title: createTitlePrefix(req, 'Featured Promotion'),
    header_text: 'Featured Promotion'
  });
});


router.get('/shipping-instructions', (req, res, next) => {
  res.render('shipping-instructions', {
    section: 'shipping-instructions',
    title: createTitlePrefix(req, 'Shipping Instructions'),
    header_text: 'Shipping Instructions'
  });
});

router.get('/technique-books', (req, res, next) => {
  const books = [
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
    header_text: 'Technique Books'
  });
});

router.get('/contact-us', (req, res, next) => {
  res.render('contact-us', {
    section: 'contact-us',
    title: createTitlePrefix(req, 'Contact Us'),
    header_text: 'Contact Us',
    subject: req.query.subject || ""
  });
});

//////////////
// About Us //
/////////////

router.get('/the-lab', (req, res, next) => {
  res.render('the-lab', {
    section: 'the-lab',
    title: createTitlePrefix(req, 'The Lab'),
    header_text: 'The Lab'
  });
});

router.get('/the-owners', (req, res, next) => {
  res.render('the-owners', {
    section: 'the-owners',
    title: createTitlePrefix(req, 'The Owners'),
    header_text: 'The Owners'
  });
});

router.get('/lab-photos', (req, res, next) => {
  const fs            = require('fs'),
        file_names    = fs.readdirSync('./public/images/lab_photos'),
        len           = file_names.length,
        srubbed_names = [];

  let file_ext,
      file_name;

  for (let i = 0; i < len; i++) {
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
    header_text: 'Lab Photos'
  });
});

//////////////////
// Lab Services //
/////////////////

router.get('/itero', (req, res, next) => {
  res.render('itero', {
    section: 'itero',
    title: createTitlePrefix(req, 'iTero'),
    header_text: 'iTero'
  });
});

router.get('/ceramics', (req, res, next) => {
  res.render('ceramics', {
    section: 'ceramics',
    title: createTitlePrefix(req, 'Ceramics'),
    header_text: 'Ceramics'
  });
});

router.get('/implants', (req, res, next) => {
  res.render('implants', {
    section: 'implants',
    title: createTitlePrefix(req, 'Implants'),
    header_text: 'Implants'
  });
});

router.get('/removable-prosthetics', (req, res, next) => {
  res.render('removable-prosthetics', {
    section: 'removable-prosthetics',
    title: createTitlePrefix(req, 'Removable Prosthetics'),
    header_text: 'Removable Prosthetics'
  });
});

router.get('/secure', (req, res, next) => {
  res.render('secure', {
    section: 'admin',
    title: 'Hello there',
    header_text: 'You made it'
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    res.redirect('/login');
  })
});

router.get('/login', (req, res, next) => {
  res.render('login', {
    section: 'site-login',
    title: 'Hello there',
    header_text: 'Admin Login'
  });
});

router.post('/login', (req, res, next) => {
  if (req.body.username && req.body.username === process.env.ADMIN_USER &&
      req.body.password && req.body.password === process.env.ADMIN_PASS) {
    req.session.authenticated = true;
    res.redirect('secure');
  } else {
    res.render('login', {
      section: 'site-login',
      title: 'Login error',
      header_text: 'Admin Login',
      msg: 'Username and/or password is in correct'
    });
  }
});

///////////////////////
// Erroneous Route(s)//
//////////////////////

router.get('/meet-our-team', (req, res, next) => {
  res.redirect('/the-owners');
});

module.exports = router;
