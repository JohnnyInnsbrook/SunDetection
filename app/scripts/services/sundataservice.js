'use strict';

/**
 * @ngdoc service
 * @name isTheSunOutApp.sunDataService
 * @description
 * # sunDataService
 * Factory in the isTheSunOutApp.
 */
angular.module('isTheSunOutApp')
  .factory('sunDataService', function ($http, $q) {    
   var service  = this;
   this.sunData = 'test';
      //utility function
    var findAndReturnFirstElementMatchValue = function(node, value){
      var matchNodes = node.getElementsByTagName(value);
      if(matchNodes.length === 0){
        return '';
      }
      return matchNodes[0].innerHTML;
    };

    // utility function
    var convertStringToDate = function(value){
      var today = new Date();
      var hour = value.substr(0,2);
      var min = value.substr(3,2);
      var sec = value.substr(6,4);
      var temp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, min, sec);
      return temp;
    };

    // utility function
    var stdTimezoneOffset = function() {
      var today = new Date();
      var jan = new Date(today.getFullYear(), 0, 1);
      var jul = new Date(today.getFullYear(), 6, 1);
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };

    // utility function
    var isDst = function() {
      var today = new Date();
      return today.getTimezoneOffset() < stdTimezoneOffset() ? 1 : 0 ;
    };
 
    // url generation function
    var generateBaseSunsetServiceURL = function(userCoordinates, date, timeZoneOffset, isDst){
      var baseSunsetServiceURL = 'http://www.earthtools.org/sun/';
      return  baseSunsetServiceURL + userCoordinates.latitude + '/' + userCoordinates.longitude + '/' + 
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + timeZoneOffset + '/' + isDst;
    };


    // service call
    var getDaylightData = function(urlGenerator, userCoordinates, date, deferred){
     
     var timeZoneOffset = (new Date().getTimezoneOffset() / 60) *  -1;
      $http.get(urlGenerator(userCoordinates, date, timeZoneOffset, isDst())).success(function(data){
        var parser=new DOMParser();
        var xmlDoc=parser.parseFromString(data,'text/xml');
        var currentTime = new Date().getTime();
        var sunriseTime = convertStringToDate(findAndReturnFirstElementMatchValue(xmlDoc, 'sunrise'));
        var sunsetTime = convertStringToDate(findAndReturnFirstElementMatchValue(xmlDoc, 'sunset'));
        service.sunData = {
          sunriseTime: sunriseTime,
          sunsetTime: sunsetTime,
          sunOut: (currentTime > sunriseTime.getTime()) && (currentTime < sunsetTime.getTime())
        }; 
        deferred.resolve(service.sunData);
      }).error(function(){
        deferred.reject('unable to get DayLightData');
      });
    
    };

    // Public API here
    return {
      getSunData: function (userCoordinates, date) {
        var deferred = $q.defer();
        getDaylightData(generateBaseSunsetServiceURL, userCoordinates, date, deferred);
        return deferred.promise;
      }
    };
  });
