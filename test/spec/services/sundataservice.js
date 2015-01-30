'use strict';

describe('Service: sunDataService', function () {

  // load the service's module
  beforeEach(module('isTheSunOutApp'));

  // instantiate service
  var sunDataService;
  beforeEach(inject(function (_sunDataService_) {
    sunDataService = _sunDataService_;
  }));

  it('should do something', function () {
    expect(!!sunDataService).toBe(true);
  });

});
