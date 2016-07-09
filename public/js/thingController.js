"use strict";

angular.module('appName')
    .controller('thingController', function($scope, $http, $timeout, $interval, thingService ) {

			$scope.counter = 30;
			$scope.counter2 = 60;
			// countdown
			$scope.onTimeout = () => {
					$scope.counter--;
					myTimeout = $timeout($scope.onTimeout, 1000);
			}
			let myTimeout = $timeout($scope.onTimeout,1000)

			$scope.otherTimeout = () => {
				$scope.counter2--;
				apple = $timeout($scope.otherTimeout, 1000);
			}
			let apple = $timeout($scope.otherTimeout,1000)

			//reset countdown after 30 secs
			$interval(function(){
				$scope.counter = 30;
				$scope.onTimeout = () => {
					$scope.counter--;
					myTimeout = $timeout($scope.onTimeout, 1000);
				}
				// let myTimeout = $timeout($scope.onTimeout,1000)
			},30000)

			//reset after 60 seconds
			$interval(function(){
				$scope.counter2 = 60;
				$scope.otherTimeout = () => {
					$scope.counter2--;
					apple = $timeout($scope.otherTimeout, 1000);
				}
				// let myTimeout = $timeout($scope.onTimeout,1000)
			},60000)


			//first gif loads
			thingService.getRandomGif()
					.then(res => {
							$scope.img = res.data.data.image_url
							$scope.otherImg = res.data.data.fixed_height_small_still_url;
							$scope.height = res.data.data.image_height;
							$scope.width = res.data.data.image_width;

							$timeout(function() {
								$scope.isVisible = true;
							}, 30000)

					})

				// refresh and get a new gif after 30 seconds
        $interval(function () {
            thingService.getRandomGif()
                .then(res => {
                    console.log('res', res);
                    // let newRes = JSON.parse(res);
                    // $scope.img = res.data.data.fixed_height_small_still_url;
                    $scope.img = res.data.data.image_url
                    $scope.otherImg = res.data.data.fixed_height_small_still_url;
										$scope.height = res.data.data.image_height;
										$scope.width = res.data.data.image_width;

                    // function freeze_gif(freeze) {
                    //     var c = document.createElement('canvas');
                    //     var w = c.width = i.width;
                    //     var h = c.height = i.height;
                    //     c.getContext('2d').drawImage(i, 0, 0, w, h);
                    //     try {
                    //         i.src = c.toDataURL("image/gif"); // if possible, retain all css aspects
                    //     } catch (e) { // cross-domain -- mimic original with all its tag attributes
                    //         for (var j = 0, a; a = i.attributes[j]; j++)
                    //             c.setAttribute(a.name, a.value);
                    //         i.parentNode.replaceChild(c, i);
                    //     }
                    // }

                })
								$scope.isVisible  = false
								$timeout(function() {
									$scope.isVisible = true;
								}, 30000)
        }, 60000)


        $scope.thingArray = [];

        thingService.getAll()
            .then(function(things) {
                if (things) $scope.thingArray.push(...things);
            })
            .catch(err => {
                console.log(err);
            });



        $scope.addOneThing = function(thing) {
            thingService.addOne(thing)
                .then(function(newThing) {
                    if (newThing) $scope.thingArray.push(newThing);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        $scope.removeOneThing = function(thing) {
            let index = $scope.thingArray.indexOf(thing);
            thingService.removeOne(thing)
                .then(function() {
                    $scope.thingArray.splice(index, 1);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        //  assumes uuid that doesn't change on edit
        $scope.editOneThing = function(editedThing) {
            console.log(editedThing);
            thingService.editOne(editedThing)
                .then(function(updatedThing) {
                    console.log('edited');
                })
                .catch(err => {
                    console.log(err);
                });
        }


    });
