"use strict;"

angular.module('appName')
.service('twitterService', function($http){


	this.upload = (imgUrl) => {
		return $http({
			method:'post',
			url: '/api/twitter/upload',
			data:{imgUrl:imgUrl}
		})
		.then( res => {
			if (res.data.length)
				return console.log(res.data);
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

});

