var Promo = require('../models/promo.js');

exports.post = (req, res) => {
  var p = new Promo({
    title: req.body.title,
    text: req.body.text
  });

  p.save(err => {
    if (err) throw err; // TODO: Show clean error(s) in the view

    req.session.msg = 'Promotion added';
    res.redirect('promo');
  });
}

exports.list = (req, res) => {
  var msg = req.session.msg || undefined;
  req.session.msg = null;

  Promo.find({}, (err, promos) => {
    res.render('promo', {
      section: 'admin-promo',
      title: '',
      header_text: 'Promotions!',
      msg,
      promos
    });
  });
}

exports.update = (req, res) => {
  var id = req.params.id;

  Promo.findById(id, (err, promo) => {
    if (err) throw err; // TODO: Show clean error(s) in the view

    promo.title = req.body[`update_title_${id}`];
    promo.text = req.body[`update_text_${id}`];

    promo.save(err => {
      if (err) throw err; // TODO: Show clean error(s) in the view

      req.session.msg = 'Promotion updated';
      res.redirect('back');
    });
  });
}

exports.set_live = async (req, res) => {
  var id = req.body.promos_select;

  await Promo.findOneAndUpdate(
    { "live" : "true" },
    { $set: { "live" : false } },
    err => {
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
      (err, promo) => {
        if (err) throw err;

        req.app.locals.promo = promo;
        req.session.msg = promo.title + ' is now live';
        res.redirect('back');
      }
    )
  }
}

exports.delete = (req, res) => {
  Promo.deleteOne({
    _id: req.params.id
  }, err => {
    if (err) throw err; // TODO: Show clean error(s) in the view

    req.session.msg = 'Promotion deleted';
    res.redirect('back');
  });
}