"use strict;"

var app = angular.module('appName', ['ui.bootstrap','ui.router','xeditable']); 
app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('user', {url: '/', templateUrl: 'html/user.html', controller: 'userController'})
      .state('thing', {url: '/', templateUrl: 'html/thing.html', controller: 'thingController'})

    $urlRouterProvider.otherwise('/');

});

