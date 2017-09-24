var Promo = require('../models/promo.js');

exports.post = function(req, res) {
  var p = new Promo({
    title: req.body.title,
    text_teaser: req.body.text_teaser,
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
      company_name: req.app.get('company_name'),
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
    promo.text_teaser = req.body[`update_text_teaser_${id}`];
    promo.text = req.body[`update_text_${id}`];

    promo.save(function(err) {
      if (err) throw err; // TODO: Show clean error(s) in the view

      req.session.msg = 'Promotion updated';
      res.redirect('back');
    });
  });
}

exports.set_live = function(req, res) {
  var id = req.body.promos_select;

  // set any live promos to false
  Promo.update(
    { live: { $eq: true } },
    { $set: { live: false } },
    { multi: true }, function(err) {
      if (err) throw err;
    }
  )

  if (id === '#') {
    req.session.msg = 'Promotions are disabled';
    res.redirect('back');
  } else { // set the chosen promo live
    Promo.findOneAndUpdate(
      { _id: id },
      { $set: {live: true} },
      { upsert: false}, function(err, promo) {
        if (err) throw err;

        req.session.msg = promo.title + ' is now live';
        res.redirect('back');
      }
    )
  }
}

exports.delete = function(req, res) {
  Promo.remove({
    _id: req.params.id
  }, function(err) {
    if (err) throw err; // TODO: Show clean error(s) in the view

    req.session.msg = 'Promotion deleted';
    res.redirect('back');
  });
}

// // first locates a thread by title, then locates the replies by thread ID.
// exports.show = (function(req, res) {
//     Thread.findOne({title: req.params.title}, function(error, thread) {
//         var posts = Post.find({thread: thread._id}, function(error, posts) {
//           res.send([{thread: thread, posts: posts}]);
//         });
//     })
// });