//This is where youd put your Mongo schemas in, for example...
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('Test', testSchema);