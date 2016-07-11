"use strict;"

angular.module('starkC')
.controller('hashtagController', function($scope,$http, toastr, ngSocket, userService) {
	console.log('hashCtrl');
	// $scope.thingArray =[];
	// thingService.getAll()
	// .then( function(things){
	// 	if(things) $scope.thingArray.push(...things);
	// })
	// .catch( err => {
	// 	console.log(err);
	// });
	// $scope.removeOneThing = function(thing){
	// 	let index = $scope.thingArray.indexOf(thing);
	// 	thingService.removeOne(thing)
	// 	.then( function(){
	// 		$scope.thingArray.splice(index,1);
	// 	})
	// 	.catch( err => {
	// 		console.log(err);
	// 	});
	// }
	//
	// //  assumes uuid that doesn't change on edit
	// $scope.editOneThing = function(editedThing){
	// 	console.log(editedThing);
	// 	thingService.editOne(editedThing)
	// 	.then( function(updatedThing){
	// 		console.log('edited');
	// 	})
	// 	.catch( err => {
	// 		console.log(err);
	// 	});
	// };

	//////////////////////////////////
	// Socket Stuff
	//////////////////////////////////
	// get new image
	$scope.voted = false;
	$scope.submitted = false;
	let image, giph, dbTime;

	ngSocket.on('time', time=>{
		dbTime = time;
		$scope.submitTime = time;
		$scope.counter2 = time;
		time > 30 ? $scope.image = image : $scope.image = giph;
	});
	ngSocket.on('newImage', data =>{
		image = data.result.url;
		giph = data.gifUrl;
	});

	ngSocket.on('submission', time=>{
		$scope.counter = time;
	});

	ngSocket.on('winner', data=>{
		console.log('winner: ', data);
		$scope.tweet = data.tweet.id_str;
		console.log('$scope.tweet', data.tweet.id_str);

		data.winner === $scope.user ? toastr.success('CONGRATULATIONS! YOU WON', 'YOU WIN') : toastr.error('Sorry you didn\'t win. Try harder.', 'LOSER');
		renderTable();
	})


	setTimeout(()=>{
		console.log('$scope.welcome : ', $scope.welcome);
		if($scope.welcome)
		$scope.hashtags = $scope.welcome.allHashtags;
		$scope.welcome.roundCount > 30 ? $scope.image = $scope.welcome.pngUrl : $scope.image = $scope.welcome.gifUrl;
		renderTable($scope.welcome.allHashtags);
	}, 500)


	$scope.addHashTag = hash => {
		$scope.submitted = true;
		hashtag = {
			hash    : $scope.hashtag,
			vote    : 0,
			id      : $scope.user
		};
		ngSocket.emit('submitHashtag', {hashtag});
		let thanks = ['Awesome!', 'Thanks!', 'You Rock!', 'Hahahah, that\'s hillarious.', 'Bwahahaha...', 'iiiiiiiiii like it!'];
		// toastr.warning('Now you should vote on your favorite.', 'Vote Now');
		toastr.info(thanks[Math.floor(Math.random()*thanks.length)], 'Submitted');
	};

	$scope.addVote = hashtag => {
		$scope.voted = true;
		console.log(hashtag);
		ngSocket.emit('vote', hashtag);
		let votes = ['That one? really?!', 'Ok you got it!', 'That\'s a good choice.', 'Ummm....if you say so'];
		toastr.success(votes[Math.floor(Math.random()*votes.length)], 'Vote Submitted');
	};

	let renderTable = (hashtags = null) => $scope.hashtags = hashtags;

	// get all hash tags after submission
	ngSocket.on('allHashtags', data => renderTable(data));

	ngSocket.on('newVote', data=> renderTable(data));


});
