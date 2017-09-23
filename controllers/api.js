var Promo = require('../models/promo.js');

exports.post = function(req, res) {
  //console.log(req.body);
  var p = new Promo({
    title: req.body.title,
    text_teaser: req.body.text_teaser,
    text: req.body.text
  });

  p.save(function(err) {
    if (err) throw err; // TODO: Show clean error(s) in the view

    req.session.msg = 'Promotion added';
    res.redirect('promos');
  });
}

// exports.list = function(req, res) {
//   Thread.find(function(err, threads) {
//     res.send(threads);
//   });
// }

// // first locates a thread by title, then locates the replies by thread ID.
// exports.show = (function(req, res) {
//     Thread.findOne({title: req.params.title}, function(error, thread) {
//         var posts = Post.find({thread: thread._id}, function(error, posts) {
//           res.send([{thread: thread, posts: posts}]);
//         });
//     })
// });