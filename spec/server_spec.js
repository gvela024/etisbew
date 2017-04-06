'use strict';

describe('src.server', () => {
  const proxyquire = require('proxyquire');
  const mach = require('mach.js');

  const app = mach.mockObject({
    get: () => {},
    listen: () => {},
    use: () => {}
  }, 'app');

  let express = () => {
    return app;
  }
  express.static = mach.mockFunction('express.static');

  const Server = {
    listen: (port, action) => {
      action();
    }
  };

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

  const path = mach.mockObject({
    join: () => {}
  }, 'path');

  const SensorModel = mach.mockFunction('SensorModel');

  const mongooseUtils = {
    on: mach.mockFunction('mongoose utils "on"'),
    once: (status, response) => {
      expect(status).toEqual('open');
      response();
    }
  };

  const mongoose = mach.mockObject({
    Promise: undefined,
    connect: () => {},
    connection: mongooseUtils
  }, 'mongoose');

  const output = mach.mockFunction('console.log');

  const server = proxyquire(
    '../src/server.js', {
      'express': express,
      'http': http,
      'socket.io': socketIo,
      'body-parser': bodyParser,
      'path': path,
      'mongoose': mongoose,
      './sensor/Model': SensorModel
    });

  it('should start the server', (done) => {
    const port = 3001;
    const localDatabaseUri = 'mongodb://localhost/test';
    path.join.shouldBeCalledWith(__dirname.replace('/spec', '/src'), 'static').andWillReturn('/some/path')
      .then(express.static.shouldBeCalledWith('/some/path', mach.same({
        extensions: ['html', 'js', 'jsx']
      })).andWillReturn('a bunch of files'))
      .then(app.use.shouldBeCalledWith('a bunch of files'))
      .then(bodyParser.json.shouldBeCalled().andWillReturn('some configuration'))
      .then(app.use.shouldBeCalledWith('some configuration'))
      .then(mongoose.connect.shouldBeCalledWith(localDatabaseUri))
      .then(mongooseUtils.on.shouldBeCalledWith('error', mach.any))
      .then(SensorModel.shouldBeCalledWith(mach.same(io), mach.same(mongoose)))
      .then(output.shouldBeCalledWith('Running on ' + port))
      .when(() => {
        server.start(output)});
    done();
  });
});
