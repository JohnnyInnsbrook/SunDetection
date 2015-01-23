'use strict';

/**
 * @ngdoc overview
 * @name isTheSunOutApp
 * @description
 * # isTheSunOutApp
 *
 * Main module of the application.
 */
(function (){

	var app = angular.module('isTheSunOutApp', []);

	app.controller('SunController', ['$http', function($http){
		var controller = this;
		var today = new Date();
		this.sunOut = true; 
		this.sunriseTime ='';
		this.sunsetTime = '';
		this.usersLat = '';
		this.usersLong = '';
		this.timeZoneOffSet = (today.getTimezoneOffset() / 60) *  -1;
		

		//utility function
		this.findAndReturnFirstElementMatchValue = function(node, value){
			var matchNodes = node.getElementsByTagName(value);
			if(matchNodes.length === 0){
				return '';
			}
			return matchNodes[0].innerHTML;
		};

		// utility function
		this.convertStringToDate = function(value){
			var today = new Date();
			var hour = value.substr(0,2);
			var min = value.substr(3,2);
			var sec = value.substr(6,4);
			var temp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, min, sec);
			return temp;
		};

		// utility function
		this.stdTimezoneOffset = function() {
			var today = new Date();
			var jan = new Date(today.getFullYear(), 0, 1);
			var jul = new Date(today.getFullYear(), 6, 1);
			return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
		};

		// utility function
		this.isDst = function() {
			var today = new Date();
			return today.getTimezoneOffset() < controller.stdTimezoneOffset();
		};

		// url generation function
		this.generateBaseSunsetServiceURL = function(){
			var today = new Date();
			var baseSunsetServiceURL = 'http://www.earthtools.org/sun/';
			return  baseSunsetServiceURL + controller.usersLat + '/' + controller.usersLong + '/' + 
				today.getDate() + '/' + (today.getMonth() + 1) + '/' + controller.timeZoneOffSet + '/' + 
					controller.daylightSavingsTime;
		};

		// service call
		this.getDaylightData = function(urlGenerator){
			$http.get(urlGenerator()).success(function(data){
			console.log(data);
			var parser=new DOMParser();
            var xmlDoc=parser.parseFromString(data,'text/xml');
            controller.sunriseTime = controller.convertStringToDate(controller.findAndReturnFirstElementMatchValue(xmlDoc, 
            	'sunrise'));
			controller.sunsetTime  = controller.convertStringToDate(controller.findAndReturnFirstElementMatchValue(xmlDoc, 
				'sunset'));
			var currentTime = new Date().getTime();
			controller.sunOut = (currentTime > controller.sunriseTime.getTime()) && 
					(currentTime < controller.sunsetTime.getTime());
 
			}).error(function(){
				console.log('fail');
			});
		};


		// handler
		this.getCurrentPositionHandler = function(position){
			controller.usersLat = position.coords.latitude ;
			controller.usersLong = position.coords.longitude;
			controller.getDaylightData(controller.generateBaseSunsetServiceURL);
		};

		this.daylightSavingsTime = this.isDst() ? 1 : 0;

 		if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(this.getCurrentPositionHandler);
    	}

	}]);

 })();
