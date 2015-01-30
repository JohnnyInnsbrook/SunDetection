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

		var getSunData = function(){
			sunDataService.getSunData(controller.userCoordinates, new Date()).then(
				function(value){
					controller.sunData = value;
				},
				function(value){
					controller.sunData = {};
					console.log(value);
				});
		};

		locationService.getUserCoordinates().then(
			function(value){
				controller.userCoordinates = value;
				getSunData();
			},
			function(value){
				controller.userCoordinates = {};
				console.log(value);
			}
		);

		
  });
