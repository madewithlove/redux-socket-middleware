'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (socket) {
  socket.on('redux-socket-middleware/DISPATCH_ACTION', function (action) {
    socket.broadcast.emit('redux-socket-middleware/RECEIVE_ACTION', action);
  });
};

module.exports = exports['default'];