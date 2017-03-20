'use strict';

describe('src.server', () => {
  const proxyquire = require('proxyquire');
  const mach = require('mach.js');

  const app = mach.mockObject({
    get: () => {},
    listen: () => {}
  }, 'app');
  const express = () => {
    return app;
  }

  const port = 3000;
  const server = proxyquire(
    '../src/server.js', {
      'express': express
    });

  it('should start the server', (done) => {
    app.get.shouldBeCalledWith('/', mach.any)
      .then(app.listen.shouldBeCalledWith(port, mach.any))
      .when(server.start);
    done();
  });


});
