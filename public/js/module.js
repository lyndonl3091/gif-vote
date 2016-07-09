"use strict;"

var app = angular.module('starkC', ['ui.bootstrap','ui.router', 'btford.socket-io', 'ngAnimate', 'toastr']);
app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('user', {
    url: '/',
    templateUrl: 'html/user.html',
    controller: 'userController'
  })
  .state('hashtag', {
    url: '/',
    templateUrl: 'html/hashtag.html',
    controller: 'hashtagController'
  })

  $urlRouterProvider.otherwise('/');

});
