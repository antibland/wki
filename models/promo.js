// The Promo model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var promoSchema = new Schema({
    date: {type: Date, default: Date.now},
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    live: { type: Boolean, default: false }
});

var Promo = mongoose.model('Promo', promoSchema);

module.exports = Promo;