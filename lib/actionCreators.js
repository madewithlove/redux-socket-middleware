'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _constants = require('./constants');

function connect(url) {
  return {
    type: _constants.SOCKET_CONNECT,
    url: url
  };
}