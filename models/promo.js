// The Promo model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var promoSchema = new Schema({
    date: {type: Date, default: Date.now},
    title: { type: String, required: true, unique: true },
    text_teaser: { type: String, required: true },
    text: { type: String, required: true }
});

var Promo = mongoose.model('Promo', promoSchema);

module.exports = Promo;