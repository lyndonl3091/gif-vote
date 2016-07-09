"use strict;"

angular.module('appName')
.controller('thingController', function($scope,$http,thingService,twitterService) {

	$scope.getRandomGif = () => {
		thingService.getRandomGif()
			.then(res => {
				$scope.img = res.data.data.image_url
			})
	}

	$scope.download = thingService.downloadGif;

	$scope.upload = twitterService.upload;

	$scope.thingArray = [];

	thingService.getAll()
	.then( function(things){
		if(things) $scope.thingArray.push(...things);
	})
	.catch( err => {
		console.log(err);
	});



	$scope.addOneThing = function(thing){
		thingService.addOne(thing)
		.then( function(newThing){
			if(newThing) $scope.thingArray.push(newThing);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.removeOneThing = function(thing){
		let index = $scope.thingArray.indexOf(thing);
		thingService.removeOne(thing)
		.then( function(){
			$scope.thingArray.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

	//  assumes uuid that doesn't change on edit
	$scope.editOneThing = function(editedThing){
		console.log(editedThing);
		thingService.editOne(editedThing)
		.then( function(updatedThing){
			console.log('edited');
		})
		.catch( err => {
			console.log(err);
		});
	}


});
