'use strict';

const io = require('socket.io');

exports.init = (io, socket) => {
  let newImage,
      winner,
      allTags = [];

  // socket.on('backEnd', data => {
  //   console.log('FR: FrontEnd\n', data);
  // });
  //
  // let testBackEnd = 'FrontEnd, BackEnd: TEST';
  // socket.emit('mainCtrl', testBackEnd);

  socket.emit('newImage', newImage);

  socket.on('hashtag', data=>{
    allTags.push(data.hashtag);
    socket.broadcast('allHashTags', allTags);
  });

  socket.on('vote', data=>{
    let votedOn = allTags[allTags.indexOf(data.hashtag)];
    votedOn.vote += 1;
    //re-broadcast new vote to all users
    socket.broadcast('newVote', allTags);
  });

  let findWinner = allTags =>{
    let winner = allTags[0];
    allTags.forEach(hashtag=> hashTag.vote > winner.vote ? winner = hashTag : null );
    socket.broadcast('winner', winner.id);
  };
};
