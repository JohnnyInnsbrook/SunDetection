'use strict';

/**
 * @ngdoc service
 * @name isTheSunOutApp.locationService
 * @description
 * # locationService
 * Factory in the isTheSunOutApp.
 */
angular.module('isTheSunOutApp')
  .factory('locationService', function ($q) {
    return {
      getUserCoordinates: function () {
        var deferred = $q.defer();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
            deferred.resolve({latitude:position.coords.latitude, longitude: position.coords.longitude});
          });
        }
        else{
          deferred.reject('navigator.geolocation not available');
        }
        return deferred.promise;
      }
    };
  });
