"use strict";var soundAngularApp=angular.module("soundAngularApp",["ngRoute","soundAngularCtrl"]);soundAngularApp.config(["$routeProvider",function(e){e.when("/home",{templateUrl:"templates/home.html",controller:"genreListCtrl"}).when("/home/:username/:slug",{templateUrl:"templates/cloudcast.html",controller:"cloudcastCtrl"}).otherwise({redirectTo:"home"})}]);var soundAngularCtrl=angular.module("soundAngularCtrl",[]);soundAngularCtrl.controller("genreListCtrl",["$scope","$http","partBeforeLastSlash",function(e,t,r){t.jsonp("http://api.mixcloud.com/categories?callback=JSON_CALLBACK").success(function(t){e.genres=t,e.temp=t.data}),e.selectGenre=function(n){e.searchgenre=n,t.jsonp("http://api.mixcloud.com/tag/"+n+"/?callback=JSON_CALLBACK&metadata=1").success(function(t){e.filterpop=r(t.metadata.connections.popular),e.filternew=r(t.metadata.connections.new),e.filterhot=r(t.metadata.connections.hot),e.tagsFilters=[{name:e.filterpop,alias:"Popular"},{name:e.filternew,alias:"Latest"},{name:e.filterhot,alias:"Trending"}]})},e.isSelectedGenre=function(t){return e.searchgenre===t},e.selectFilter=function(r,n){t.jsonp("http://api.mixcloud.com/tag/"+r+"/"+n+"/?callback=JSON_CALLBACK").success(function(t){e.resultsbyfilter=t})},e.$watch("searchgenre",function(){angular.forEach(e.temp,function(t){return e.searchgenre!==t.slug?!1:void e.selectGenre(e.searchgenre)})}),e.clearFilters=function(){e.searchgenre="",e.resultsbyfilter=""}}]),soundAngularCtrl.controller("cloudcastCtrl",["$scope","$http","$routeParams","$sce",function(e,t,r,n){t.jsonp("http://api.mixcloud.com/"+r.username+"/"+r.slug+"/?callback=JSON_CALLBACK").success(function(t){e.cloudcast=t}),e.trustSrc=function(){var e="http://www.mixcloud.com/widget/iframe/?feed=http%3A%2F%2Fwww.mixcloud.com%2F"+r.username+"%2F"+r.slug+"%2F;replace=0&amp;hide_cover=&amp;light=&amp;hide_artwork=&amp;stylecolor=&amp;embed_type=widget_standard&amp;hide_tracklist=0";return n.trustAsResourceUrl(e)}}]),soundAngularCtrl.factory("partBeforeLastSlash",function(){return function(e){var t=e.split("/"),r=t[t.length-2];return r}});