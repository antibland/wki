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

/* GET lab page */
router.get('/lab', function(req, res, next) {
  res.render('lab', {
    section: 'lab',
    title: 'Our lab',
    company_name: req.app.get('company_name')
  });
});

/* GET lab page */
router.get('/work', function(req, res, next) {
  res.render('work', {
    section: 'work',
    title: 'Our work',
    company_name: req.app.get('company_name')
  });
});

/* GET lab page */
router.get('/literature', function(req, res, next) {
  res.render('literature', {
    section: 'literature',
    title: 'Literature',
    company_name: req.app.get('company_name')
  });
});

/* GET lab page */
router.get('/contact', function(req, res, next) {
  res.render('contact', {
    section: 'contact',
    title: 'Contact us',
    company_name: req.app.get('company_name')
  });
});

module.exports = router;
