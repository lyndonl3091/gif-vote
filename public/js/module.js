"use strict;"

var app = angular.module('starkC', ['ui.bootstrap','ui.router','xeditable', 'btford.socket-io']);
app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('user', {url: '/', templateUrl: 'html/user.html', controller: 'userController'})
      .state('thing', {url: '/', templateUrl: 'html/thing.html', controller: 'thingController'})

    $urlRouterProvider.otherwise('/');

});
