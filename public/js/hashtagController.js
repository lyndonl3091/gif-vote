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
			id      : $scope.user
		};
		ngSocket.emit('submitHashtag', {hashtag});
		let thanks = ['Awesome!', 'Thanks!', 'You Rock!', 'Hahahah, that\'s hillarious.', 'Bwahahaha...', 'iiiiiiiiii like it!'];
		toastr.warning('Now you should vote on your favorite.', 'Vote Now');
		toastr.info(thanks[Math.floor(Math.random()*thanks.length)], 'Submitted');
	};

	$scope.addVote = hashtag => {
		$scope.voted = true;
		console.log(hashtag);
		ngSocket.emit('vote', hashtag);
		let votes = ['That one? really?!', 'Ok you got it!', 'That\'s a good choice.', 'Ummm....if you say so'];
		toastr.success(votes[Math.floor(Math.random()*votes.length)], 'Vote Submitted');
	};

	// get all hash tags after submission
	ngSocket.on('allHashtags', data =>{
		$scope.hashtags = data;
	});

	ngSocket.on('newVote', data=>{
		console.log('newVote data: ', data);
	});

});
