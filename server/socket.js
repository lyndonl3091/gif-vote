'use strict';

const fs        = require('fs');
const request   = require('request');
const cloudinary= require('cloudinary');
const path      = require('path');
const gifPath   = path.join(__dirname, '../public/images/gif.gif');
const Twitter   = require('../routes/twitter');

exports.getIO = io => {
  let allHashtags = [];
  let giph, pngUrl, gifUrl;
  let submissionCount = 30;
  let roundCount = 60;

  io.on('connection', (socket) => {
    console.log('Client Connected @', socket.handshake.address);

    let newImage,winner;
    //first gif loads
    io.emit('welcomePackage', {gifUrl, pngUrl, allHashtags, roundCount});

    socket.on('backEnd', data => {
      console.log('FR: FrontEnd\n', data);
    });
    let testBackEnd = 'FrontEnd, BackEnd: TEST';
    socket.emit('mainCtrl', testBackEnd);

    socket.on('submitHashtag', data=>{
      allHashtags.push(data.hashtag);
      io.emit('allHashtags', allHashtags);
    });

    socket.on('vote', votedHashtagObj =>{

      allHashtags.forEach(hashtagObj=>{
        if(hashtagObj.hash === votedHashtagObj.hash) {
          hashtagObj.vote += 1;
        };
      });

      io.emit('newVote', allHashtags);
    });
  });




  setInterval(()=>{

    io.emit('submission', submissionCount--);
    io.emit('time', roundCount--);
  }, 1000);

  setInterval(()=>{
    submissionCount = 30;
  }, 30000);

  setInterval(()=>{
    if(roundCount === 1 || roundCount === 0) {
      getGiph();
      allHashtags = [];
    };
    console.log('Round Count: ', roundCount);
    roundCount = 60;
  },60000);

  let getGiph = () => request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC', (err, res, body)=>{
    giph = JSON.parse(body).data;
    console.log('NEW GIPH: ', giph);
    gifUrl       = giph.image_url;
    request({uri:gifUrl})
    .pipe(fs.createWriteStream('./public/images/gif.gif'))
    .on('error', err=> console.log('GetGiph ERROR:\n',err))
    .on('close', function() {
      getStill(gifUrl)
    });
  });

  let getStill = gifUrl => {
    cloudinary.uploader.upload(gifUrl, function(result){
      console.log('STILL IMAGE: \n', result);
      pngUrl = result.url;
      io.emit('newImage', {result, gifUrl});
      findWinner(allHashtags);
    }, {format:"png"});
  };

  let findWinner = allHashtags =>{
    let winner = allHashtags[0] || {hash : '#StarkC', vote : 0, id : '#id'};

    allHashtags.forEach(hashtag=> hashtag.vote > winner.vote ? winner = hashtag : null);

    Twitter(gifPath, winner.hash, (err, data)=> {
      if(err) console.log('err:', err);
      let winnerObj = {
        winner : winner.id,
        tweet: JSON.parse(data)
      };
      io.emit('winner', winnerObj);

    });

  };
  cloudinary.config({
    cloud_name: 'difugmfo3',
    api_key: '332563164945191',
    api_secret: 'lYH4uLO4TcuZjLFX_EXf14AwAN4'
  });

};
