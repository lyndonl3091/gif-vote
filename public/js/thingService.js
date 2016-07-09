"use strict;"

angular.module('appName')
.service('thingService', function($http){

	this.getRandomGif = () => {
		return $http.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC')
	}


	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/api/things'
		})
		.then( res => {
			if (res.data.length)
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (thing) => {
		return $http({
			method:'POST',
			url: '/api/things',
			data: thing
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (thing) => {
		return $http({
			method:'DELETE',
			url: '/api/things/' + thing._id
		});
	}

	this.editOne = (thing) => {
		return $http({
			method:'PUT',
			url: '/api/things/' + thing._id,
			data: thing
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}


});
