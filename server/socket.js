'use strict';

const io = require('socket.io');

exports.init = (io, socket) => {
  let newImage,
      winner,
      allHashtags = [];

  socket.on('backEnd', data => {
    console.log('FR: FrontEnd\n', data);
  });

  let testBackEnd = 'FrontEnd, BackEnd: TEST';
  socket.emit('mainCtrl', testBackEnd);

  io.emit('newImage', newImage);

  socket.on('submitHashtag', data=>{
    allHashtags.push(data.hashtag);
    io.emit('allHashtags', allHashtags);
  });

  socket.on('vote', voteObj =>{
    let voteOn = allHashtags.map(hashtagObj=> hashtagObj.hash === voteObj.hash ? hashtagObj.vote += 1 : null);
    //re-broadcast new vote to all users
    io.emit('newVote', allVotes);
  });

  let findWinner = allHashtags =>{
    let winner = allHashtags[0];
    allHashtags.forEach(hashtag=> hashTag.vote > winner.vote ? winner = hashtag : null );
    io.emit('winner', winner.id);
  };
};
