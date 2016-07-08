let mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
	name: String
});


let User = mongoose.model('User', userSchema);

module.exports = User;

