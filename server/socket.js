'use strict';

const io = require('socket.io');
let allHashtags = []
exports.init = (io, socket) => {
  let newImage,winner;

  socket.on('backEnd', data => {
    console.log('FR: FrontEnd\n', data);
  });

  let testBackEnd = 'FrontEnd, BackEnd: TEST';
  socket.emit('mainCtrl', testBackEnd);

  io.emit('newImage', newImage);

  socket.on('submitHashtag', data=>{
    console.log('allHashtags\n', allHashtags);
    allHashtags.push(data.hashtag);
    io.emit('allHashtags', allHashtags);
  });

  socket.on('vote', votedHashtagObj =>{
    allHashtags.forEach(hashtagObj=>{
      if(hashtagObj.hash === votedHashtagObj.hash) {
        hashtagObj.vote += 1;
        hashtagObj.voters = votedHashtagObj.voters;
      };
    });
    io.emit('newVote', allHashtags);
  });

  let findWinner = allHashtags =>{
    let winner = allHashtags[0];
    allHashtags.forEach(hashtag=> hashTag.vote > winner.vote ? winner = hashtag : null );
    io.emit('winner', winner.id);
  };
};
