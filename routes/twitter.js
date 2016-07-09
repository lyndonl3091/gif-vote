"use strict;"


var request = require('request');
let express = require('express');
let Thing = require('../models/thing');

let router = express.Router();

router.post('/upload',function(req,res){

	//  stolen from http://stackoverflow.com/questions/32836850/how-do-you-upload-a-chunked-video-to-twitter-using-node
	var bufferLength, filePath, finished, fs, oauthCredentials, offset, segment_index, theBuffer;


	var twitterText = '#twitterapitest';
	fs = require('fs');
	filePath = './public/gif.gif';
	bufferLength = 1000000;
	theBuffer = new Buffer(bufferLength);
	offset = 0;
	segment_index = 0;
	finished = 0;
	oauthCredentials = {
		consumer_key: process.env.CONSUMER_KEY,
		consumer_secret: process.env.CONSUMER_SECRET,
		token: process.env.TOKEN,
		token_secret: process.env.TOKEN_SECRET
	};

	fs.stat(filePath, function(err, stats) {
		var formData, normalAppendCallback, options;
		formData = {
			command: "INIT",
			media_type: 'image/gif',
			total_bytes: stats.size
		};
		options = {
			url: 'https://upload.twitter.com/1.1/media/upload.json',
			oauth: oauthCredentials,
			formData: formData
		};

		normalAppendCallback = function(media_id){
			return function(err, response, body) {

				finished++;
				if (finished === segment_index) {

					options.formData = {
						command: 'FINALIZE',
						media_id: media_id
					};
					request.post(options, function(err, response, body) {
						console.log('FINALIZED',response.statusCode,body);

						delete options.formData;




						postToTwitter(twitterText,body);




						// Note: This is not working as expected yet.
						// why are we asking for ID again? 
						// options.qs = {
							// 	command: 'STATUS',
							// 	media_id: media_id
							// };
							// request.get(options, function(err, response, body) {
								// 	console.log('STATUS: ', response.statusCode, body);
					// });

					});
				}
			};
		};

		request.post(options, function(err, response, body) {
			var media_id;
			media_id = JSON.parse(body).media_id_string;

			fs.open(filePath, 'r', function(err, fd) {
				var bytesRead, data;

				while (offset < stats.size) {

					bytesRead = fs.readSync(fd, theBuffer, 0, bufferLength, null);
					data = bytesRead < bufferLength ? theBuffer.slice(0, bytesRead) : theBuffer;
					options.formData = {
						command: "APPEND",
						media_id: media_id,
						segment_index: segment_index,
						media_data: data.toString('base64')
					};

					request.post(options, normalAppendCallback(media_id));
					offset += bufferLength;
					segment_index++
				}
			});
		});
	});

	var postToTwitter = function(twitterText,mediaResponse){

		var media_id_string = JSON.parse(mediaResponse).media_id_string;
		var text = encodeURI(twitterText);

		formData = {
			status: text,
		}

		options = {
			url: 'https://api.twitter.com/1.1/statuses/update.json',
			oauth: oauthCredentials,
			formData: formData
		};

		options.qs = {
			command: 'STATUS',
			media_ids: media_id_string
		};

		request.post(options,function(err,res,body){
			console.log("RESULT:",body)
		})	
	}










});





module.exports = router;

