'use strict';

describe('src.server', () => {
  const proxyquire = require('proxyquire');
  const mach = require('mach.js');
  const path = require('path');

  const app = mach.mockObject({
    get: () => {},
    listen: () => {},
    use: () => {}
  }, 'app');

  let express = () => {
    return app;
  }
  express.static = mach.mockFunction('express.static');

  const Server = mach.mockObject({
    listen: () => {}
  }, 'Server');

  const http = {
    Server: () => {
      return Server;
    }
  };

  const io = mach.mockObject({
    on: () => {}
  }, 'io');

  const socketIo = () => {
    return io;
  }

  const bodyParser = mach.mockObject({
    json: () => {}
  }, 'bodyParser');

  const pathMock = mach.mockObject({
    join: () => {}
  }, 'path');

  const server = proxyquire(
    '../src/server.js', {
      'express': express,
      'http': http,
      'socket.io': socketIo,
      'body-parser': bodyParser,
      'path': pathMock
    });

  it('should start the server', (done) => {
    const port = 3001;
    pathMock.join.shouldBeCalledWith(__dirname.replace('/spec', '/src'), 'static').andWillReturn('/some/path')
      .then(express.static.shouldBeCalledWith('/some/path', mach.same({
        extensions: ['html', 'js', 'jsx']
      })).andWillReturn('a bunch of files'))
      .then(app.use.shouldBeCalledWith('a bunch of files'))
      .then(bodyParser.json.shouldBeCalled().andWillReturn('some configuration'))
      .then(app.use.shouldBeCalledWith('some configuration'))
      .then(io.on.shouldBeCalledWith('connection', mach.any))
      .then(Server.listen.shouldBeCalledWith(port, mach.any))
      .when(server.start);
    done();
  });
});
