'use strict';

/**
 * @ngdoc filter
 * @name isTheSunOutApp.filter:sunOutFilter
 * @function
 * @description
 * # sunOutFilter
 * Filter in the isTheSunOutApp.
 */
angular.module('isTheSunOutApp')
  .filter('sunOutFilter', function () {
    return function (input) {

    	if(!input){
    		return '';
    	}

		var todaysSunrise = new Date(input.sunTimes[0].sunriseTime);
        var todaysSunset = new Date(input.sunTimes[0].sunsetTime);
        var currentTime = input.currentTime.getTime();

        var timeUntilTodaysSunrise = todaysSunrise.getTime() - currentTime;
        var timeUntilTodaysSunset = todaysSunset.getTime() - currentTime;

        return (timeUntilTodaysSunrise < 0 && timeUntilTodaysSunset > 0 ) ?  'Yes :)' : 'No :(';
 
    };
  });
