"use strict;"

angular.module('appName')
.controller('mainController', function($scope,twitterService) {

$scope.upload = twitterService.upload;

});



