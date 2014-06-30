'use strict';

var soundAngularCtrl = angular.module('soundAngularCtrl',[]);

soundAngularCtrl.controller('genreListCtrl', ['$scope', '$http', 'partBeforeLastSlash', function($scope, $http, partBeforeLastSlash) {
	// fetch the categories from mixcloud API
	$http.jsonp('http://api.mixcloud.com/categories?callback=JSON_CALLBACK').success(function(d){
		$scope.genres = d;
		$scope.temp = d.data;
	});
	// when a category/genre is clicked, pass it as an argument to the url 
	// that fetches the data according to a specific tag
	$scope.selectGenre = function(genre) {
		$scope.searchgenre = genre;
		$http.jsonp('http://api.mixcloud.com/tag/'+genre+'/?callback=JSON_CALLBACK&metadata=1').success(function(d2) {
			$scope.filterpop = partBeforeLastSlash(d2.metadata.connections.popular);
			$scope.filternew = partBeforeLastSlash(d2.metadata.connections.new);
			$scope.filterhot = partBeforeLastSlash(d2.metadata.connections.hot);
			$scope.tagsFilters = [
				{name: $scope.filterpop, alias: "Popular"}, 
				{name: $scope.filternew, alias: "Latest"}, 
				{name: $scope.filterhot, alias: "Trending"}
			];
		});
	};  
	// check if a category/genre is checked in order to add an "active" class to this elemnt.
	$scope.isSelectedGenre = function(genre) {
		return $scope.searchgenre === genre;
	};
	// fetching data after passing genre and filter (popular, latest, trending) arguments to mixlcoud API 
	$scope.selectFilter = function(genre, filter) {
		$http.jsonp('http://api.mixcloud.com/tag/'+genre+'/'+filter+'/?callback=JSON_CALLBACK').success(function(d3) {
			$scope.resultsbyfilter = d3;
		});
	};
	// watch if searchgenre model has been changed and also check 
	// if it has the same name as category's slug name
	$scope.$watch('searchgenre', function(){
		angular.forEach($scope.temp, function(value) {
 			if ($scope.searchgenre === value.slug) {
 				$scope.selectGenre($scope.searchgenre);
			} else {
				return false;
			} 
	    });
	});

	$scope.clearFilters = function() {
		$scope.searchgenre = '';
		$scope.resultsbyfilter = '';
	};
}]);
// this controller is responsible for fetching the selected clouddcast
// along with additional information for that
soundAngularCtrl.controller('cloudcastCtrl', ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {
	$http.jsonp('http://api.mixcloud.com/'+$routeParams.username+'/'+$routeParams.slug+'/?callback=JSON_CALLBACK').success(function(d4) {
		$scope.cloudcast = d4;
	});
	//apply sce (strict contextual escaping) to the url
	$scope.trustSrc = function() {
		var embededPlayerUrl = 'http://www.mixcloud.com/widget/iframe/?feed=http%3A%2F%2Fwww.mixcloud.com%2F'+$routeParams.username+'%2F'+$routeParams.slug+'%2F;replace=0&amp;hide_cover=&amp;light=&amp;hide_artwork=&amp;stylecolor=&amp;embed_type=widget_standard&amp;hide_tracklist=0';
		return $sce.trustAsResourceUrl(embededPlayerUrl);
	};
}]);

soundAngularCtrl.factory('partBeforeLastSlash', function() {
	return function(str) {
		var parts = str.split("/");
		var result = parts[parts.length - 2];
 		return result;
	};
});

