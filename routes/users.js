"use strict;"


let express = require('express');
let User = require('../models/user');

let router = express.Router();


router.route('/')
.get(function(req,res){
	User.find({}, (err,users) => {
		res.status(err? 400:200).send(err || users);
	});
})
.post(function(req,res){
	let user = new User(req.body);
	user.save((err,savedUser) => {
		res.status(err? 400:200).send(err || savedUser);
	});
});


router.route('/:id')
.get(function(req,res){
	User.find({_id:req.params.id}, (err,user) => {
		res.status((err || !user)? 400:200).send(err || user[0]);
	});
})
.put(function(req,res){
	User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedUser) => {
		res.status(err? 400:200).send(err || savedUser);
	});
})
.delete(function(req,res){
	User.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});


module.exports = router;

