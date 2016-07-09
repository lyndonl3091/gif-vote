"use strict;"

angular.module('starkC')
.controller('hashtagController', function($scope,$http, toastr, ngSocket, userService) {
console.log('hashCtrl');
	// $scope.thingArray =[];
	// thingService.getAll()
	// .then( function(things){
	// 	if(things) $scope.thingArray.push(...things);
	// })
	// .catch( err => {
	// 	console.log(err);
	// });
	// $scope.removeOneThing = function(thing){
	// 	let index = $scope.thingArray.indexOf(thing);
	// 	thingService.removeOne(thing)
	// 	.then( function(){
	// 		$scope.thingArray.splice(index,1);
	// 	})
	// 	.catch( err => {
	// 		console.log(err);
	// 	});
	// }
	//
	// //  assumes uuid that doesn't change on edit
	// $scope.editOneThing = function(editedThing){
	// 	console.log(editedThing);
	// 	thingService.editOne(editedThing)
	// 	.then( function(updatedThing){
	// 		console.log('edited');
	// 	})
	// 	.catch( err => {
	// 		console.log(err);
	// 	});
	// };

	//////////////////////////////////
	// Socket Stuff
	//////////////////////////////////
	// get new image
	$scope.voted = false;
	$scope.submitted = false;

	ngSocket.on('newImage', data =>{
		// $scope.image = data.image;

	});

	$scope.addHashTag = hash => {
		$scope.submitted = true;
		hashtag = {
			hash    : $scope.hashtag,
			vote    : 0,
			voters  : [],
			id      : $scope.user
		};
		ngSocket.emit('submitHashtag', {hashtag});
	};

	$scope.addVote = hashtag => {
		$scope.voted = true;
		hashtag.voters.push($scope.user);
		console.log(hashtag);
		ngSocket.emit('vote', hashtag);
	};

	// get all hash tags after submission
	ngSocket.on('allHashtags', data =>{
		$scope.hashtags = data;
	});

	ngSocket.on('newVote', data=>{
		console.log('newVote data: ', data);

	});

});
