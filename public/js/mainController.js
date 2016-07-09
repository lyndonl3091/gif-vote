"use strict;"

angular.module('starkC')
.controller('mainController', function($scope, ngSocket, uuid) {

  // ngSocket.on('mainCtrl', data=>{
  //   console.log('FR: Backend \n', data);
  // })
  //
  // let msg = 'Backend, Front: TEST';
  // ngSocket.emit('backEnd', msg);

  // get new image
  ngSocket.on('newImage', image =>{
    $scope.$broadcast('newImage');
    // render the image to the DOM
  });

  // submit hash tag
  let hashtag = {
    hash    : '',
    vote    : 0,
    voters  : [],
    id      : ''
  };
  ngSocket.emit('submitHashtag', {hashtag});

  // get all hash tags after submission
  ngSocket.on('allHashtags', allHashtags =>{
    $scope.$broadcast('getAllTags');
    // render all hash tags to DOM

    //vote on hashTag
    let newVote = {votedHashtag}
    ngSocket.emit('vote', newVote);


    ngSocket.on('newVote', allVotes =>{
      // render that vote to the dom.
      $scope.$broadcast('newVote')
    });

    ngSocket.on('winner', winner=>{
      // check this user's uuid for winner match
      $scope.$broadcast('winner');
    });
  });
});
