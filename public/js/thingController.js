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
	$scope.addHashTag = function(thing){
		thingService.addOne(thing)
		.then( function(newThing){
			if(newThing) $scope.thingArray.push(newThing);
		})
		.catch( err => {
			console.log(err);
		});
	}


	// get new image
	ngSocket.on('newImage', data =>{
		// $scope.image = data.image;

	});

	// submit hash tag
	$scope.hashtag = {
		hash    : '',
		vote    : 0,
		voters  : [],
		id      : $scope.user
	};
	ngSocket.emit('submitHashtag', {hashtag});

	// get all hash tags after submission
	ngSocket.on('allHashtags', data =>{
		// render all hash tags to DOM
		$scope.hashtags = data.hashtags;
	});


});
