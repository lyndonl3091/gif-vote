'use strict';

angular.module('starkC')
.factory('ngSocket', function (socketFactory) {
  var service = socketFactory();
  service.forward('error');
  return service;
});
