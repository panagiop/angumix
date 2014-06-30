'use strict';

var soundAngularApp = angular.module('soundAngularApp', ['ngRoute','soundAngularCtrl']);

soundAngularApp.config(['$routeProvider', function($routeProvider){
$routeProvider.
	when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'genreListCtrl'
	}).
	when('/home/:username/:slug', {
		templateUrl: 'templates/cloudcast.html',
		controller: 'cloudcastCtrl'
	}).
	otherwise({
		redirectTo: 'home'
	});
}]);