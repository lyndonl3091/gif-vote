'use strict';

const request = require('request');
const io      = require('socket.io');

let giph;
let allHashtags = []




let counter = 30;
let counter2 = 60;

let onTimeout = () => {
  counter--;
  myTimeout = setTimeout(onTimeout, 1000);
}
let myTimeout = setTimeout(onTimeout,1000);

let otherTimeout = () => {
  counter2--;
  apple = setTimeout(otherTimeout, 1000);
}
let apple = setTimeout(otherTimeout,1000);

//reset countdown after 30 secs
setInterval(()=>{
  counter = 30;
  onTimeout = () => {
    counter--;
    myTimeout = setTimeout(onTimeout, 1000);
  }
},30000);

//reset after 60 seconds
setInterval(()=>{
  counter2 = 60;
  otherTimeout = () => {
    counter2--;
    apple = setTimeout(otherTimeout, 1000);
  };
},60000);



// refresh and get a new gif after 30 seconds
setInterval(()=> {
  giph = getGiph();
  img       = giph.data.data.image_url;
  otherImg  = giph.data.data.fixed_height_small_still_url;
  height    = giph.data.data.image_height;
  width     = giph.data.data.image_width;
}, 60000);




exports.init = (io, socket) => {
  let newImage,winner;
  //first gif loads

  let getGiph = () => request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC', (err, res, body)=>{
    giph = JSON.parse(body).data;
    img       = giph.image_url;
    io.emit('newImage', img);
  });
  getGiph();


  socket.on('backEnd', data => {
    console.log('FR: FrontEnd\n', data);
  });
  let testBackEnd = 'FrontEnd, BackEnd: TEST';
  socket.emit('mainCtrl', testBackEnd);


  socket.on('submitHashtag', data=>{
    console.log('allHashtags\n', allHashtags);
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

  let findWinner = allHashtags =>{
    let winner = allHashtags[0];
    allHashtags.forEach(hashtag=> hashTag.vote > winner.vote ? winner = hashtag : null);
    io.emit('winner', winner.id);
  };
};
