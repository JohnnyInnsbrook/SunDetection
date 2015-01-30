'use strict';

describe('Controller: SundatacontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('isTheSunOutApp'));

  var SundatacontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SundatacontrollerCtrl = $controller('SundatacontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
