let mongoose = require('mongoose');


let thingSchema = new mongoose.Schema({
	name: String
});


let Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;

