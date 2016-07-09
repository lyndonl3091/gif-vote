"use strict;"

angular.module('starkC')
.controller('mainController', function($scope, ngSocket) {

  ngSocket.on('mainCtrl', data=>{
    console.log('FR: Backend \n', data);
  })

  let msg = 'Backend, Front: TEST';
  ngSocket.emit('backEnd', msg);

});
