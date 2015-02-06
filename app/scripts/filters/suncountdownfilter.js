'use strict';

/**
 * @ngdoc filter
 * @name isTheSunOutApp.filter:sunCountdownFilter
 * @function
 * @description
 * # sunCountdownFilter
 * Filter in the isTheSunOutApp.
 */
angular.module('isTheSunOutApp')
  .filter('sunCountdownFilter', function () {
  	 var millisecondsToTime = function (milliseconds){
      return {
        hour: (milliseconds / (1000*60*60)),
        min: ((milliseconds / (1000*60)) % 60),
        sec: (milliseconds / 1000) % 60
      };
    };

    var leftPadNumber = function(value){
  		return (value < 10) ? ('0' + value) : value;
    };

    var formatCountdownData = function (countdownData){
    	return Math.round(countdownData.hour) + ':'  + leftPadNumber(Math.round(countdownData.min)) + ':' + 
    	leftPadNumber(Math.round(countdownData.sec));
    };

    return function (input) {

    	if(!input){
    		return '';
    	}
		var todaysSunrise = new Date(input.sunTimes[0].sunriseTime);
        var todaysSunset = new Date(input.sunTimes[0].sunsetTime);
        var tomorrowSunrise  = new Date(input.sunTimes[1].sunsetTime);
        var currentTime = input.currentTime.getTime();

        var timeUntilTodaysSunrise = todaysSunrise.getTime() - currentTime;
        if(timeUntilTodaysSunrise > 0){
			return 'the Sun Comes Up ' +
				formatCountdownData(millisecondsToTime(timeUntilTodaysSunrise));
        }
        var timeUntilTodaysSunset = todaysSunset.getTime() - currentTime;
        if(timeUntilTodaysSunset > 0){
			return 'the Sun Goes Down ' +
				formatCountdownData(millisecondsToTime(timeUntilTodaysSunset));
        }
        var timeUntilTomorrowsSunrise = tomorrowSunrise.getTime() - currentTime;
      	return 'the Sun Comes Up ' + formatCountdownData(timeUntilTomorrowsSunrise);
    };
  });
