'use strict';

/**
 * @ngdoc function
 * @name isTheSunOutApp.controller:SundatacontrollerCtrl
 * @description
 * # SundatacontrollerCtrl
 * Controller of the isTheSunOutApp
 */
angular.module('isTheSunOutApp')
  .controller('SundatacontrollerCtrl', function (locationService, sunDataService) {
    	var controller = this;

    	
		var getSunData = function(currentTime){
			sunDataService.getSunData(controller.userCoordinates, currentTime).then(
				function(value){
					value.currentTime = currentTime;
					controller.sunData = value;

				},
				function(value){
					controller.sunData = {};
					console.log(value);
				});
		};

	

		var timerHandler = function(){
			var currentTime = new Date();
    		getSunData(currentTime);
    		
		};
    
		var kickoffTimer = function (){
			window.setInterval(function(){
			timerHandler();
   			},1000);	
		};

		locationService.getUserCoordinates().then(
			function(value){
				controller.userCoordinates = value;
				timerHandler();
				kickoffTimer();

			},
			function(value){
				controller.userCoordinates = {};
				console.log(value);
			}
		);

		
		

		
  });
