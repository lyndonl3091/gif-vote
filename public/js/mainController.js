"use strict;"

angular.module('starkC')
.controller('mainController', function($scope, toastr, ngSocket, userService) {
  console.log('mainCtrl');
  userService.getUUID()
  .then(res=> {
    $scope.user = res.data
    $scope.$broadcast('userid');
  })
  .catch(err=> console.log('ERROR getting uuid: ', error));


  ngSocket.on('mainCtrl', data=> console.log('FR: Backend \n', data));
  let msg = 'Backend, Front: TEST';
  ngSocket.emit('backEnd', msg);

  ngSocket.on('welcomePackage', data=> {
    $scope.welcome = data
    console.log('$scope.welcome: ', $scope.welcome);
  });
});
