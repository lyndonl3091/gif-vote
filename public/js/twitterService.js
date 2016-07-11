"use strict;"

angular.module('starkC')
.service('twitterService', function($http){


	this.upload = (imgPath) => {
		return $http({
			method:'post',
			url: '/api/twitter/upload',
			data:{imgPath:imgPath}
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
