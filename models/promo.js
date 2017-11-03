// The Promo model

const mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

mongoose.Promise = global.Promise;

const promoSchema = new Schema({
    date: {type: Date, default: Date.now},
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    live: { type: Boolean, default: false }
});

const Promo = mongoose.model('Promo', promoSchema);

module.exports = Promo;