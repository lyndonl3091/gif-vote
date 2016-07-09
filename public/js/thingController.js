"use strict";

angular.module('appName')
    .controller('thingController', function($scope, $http, thingService) {

        $scope.getRandomGif = () => {
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
        }

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
