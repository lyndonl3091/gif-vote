"use strict;"

angular.module('starkC')
.controller('mainController', function($scope, ngSocket) {

  ngSocket.on('mainCtrl', data=>{
    console.log('FR: Backend \n', data);
  })

});
