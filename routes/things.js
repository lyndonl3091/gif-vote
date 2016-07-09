"use strict;"


let http = require('http');
let fs = require('fs');
let request = require('request');
let express = require('express');
let Thing = require('../models/thing');

let router = express.Router();


var gifPath = './file.gif';


router.post('/download', function(req,res){
	request({uri:req.body.gifUrl})
	.pipe(fs.createWriteStream(gifPath))
	.on('close', function(){
		res.send(gifPath);
	})
})


router.route('/')
.get(function(req,res){
	Thing.find({}, (err,things) => {
		res.status(err? 400:200).send(err || things);
	});
})
.post(function(req,res){
	let thing = new Thing(req.body);
	thing.save((err,savedThing) => {
		res.status(err? 400:200).send(err || savedThing);
	});
});


router.route('/:id')
.get(function(req,res){
	Thing.find({_id:req.params.id}, (err,thing) => {
		res.status((err || !thing)? 400:200).send(err || thing[0]);
	});
})
.put(function(req,res){
	Thing.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedThing) => {
		res.status(err? 400:200).send(err || savedThing);
	});
})
.delete(function(req,res){
	Thing.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});


module.exports = router;

