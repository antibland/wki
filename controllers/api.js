var Promo = require('../models/promo.js');

exports.post = function(req, res) {
  var p = new Promo({
    title: req.body.title,
    text: req.body.text
  });

  p.save(function(err) {
    if (err) throw err; // TODO: Show clean error(s) in the view

    req.session.msg = 'Promotion added';
    res.redirect('promo');
  });
}

exports.list = function(req, res) {
  var msg = req.session.msg || undefined;
  req.session.msg = null;

  Promo.find({}, function(err, promos) {
    res.render('promo', {
      section: 'admin-promo',
      title: '',
      header_text: 'Promotions!',
      msg,
      promos
    });
  });
}

exports.update = function(req, res) {
  var id = req.params.id;

  Promo.findById(id, function(err, promo) {
    if (err) throw err; // TODO: Show clean error(s) in the view

    promo.title = req.body[`update_title_${id}`];
    promo.text = req.body[`update_text_${id}`];

    promo.save(function(err) {
      if (err) throw err; // TODO: Show clean error(s) in the view

      req.session.msg = 'Promotion updated';
      res.redirect('back');
    });
  });
}

exports.set_live = async function(req, res) {
  var id = req.body.promos_select;

  await Promo.findOneAndUpdate(
    { "live" : "true" },
    { $set: { "live" : false } },
    function(err) {
      if (err) throw err;
    }
  )

  if (id === '#') { // 'None' was selected with a value of '#'
    req.session.msg = 'Promotions are disabled';
    res.redirect('back');
  } else { // set the chosen promo live
    await Promo.findOneAndUpdate(
      { _id: id },
      { $set: { "live" : true } },
      function(err, promo) {
        if (err) throw err;

        req.app.locals.promo = promo;
        req.session.msg = promo.title + ' is now live';
        res.redirect('back');
      }
    )
  }
}

exports.delete = function(req, res) {
  Promo.deleteOne({
    _id: req.params.id
  }, function(err) {
    if (err) throw err; // TODO: Show clean error(s) in the view

    req.session.msg = 'Promotion deleted';
    res.redirect('back');
  });
}