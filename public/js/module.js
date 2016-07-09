"use strict;"

var app = angular.module('starkC', ['ui.bootstrap','ui.router', 'btford.socket-io', 'ngAnimate', 'toastr']);
app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url: '/'
  })
  .state('hashtag', {
    url: '/play',
    templateUrl: 'html/hashtag.html',
    controller: 'hashtagController'
  })

  $urlRouterProvider.otherwise('/');

});
