'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = socketMiddleware;

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _constants = require('./constants');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  actions: []
};

function socketMiddleware() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

  var socket = undefined;
  options = (0, _deepmerge2.default)(defaultOptions, options);

  // Determines wether or not an action should be emitted to the socket server.
  var shouldEmit = function shouldEmit(action) {
    return socket // We need a socket server
     && !action.emitted // If the action was emitted before, we will not emit it again.
     && options.actions.includes(action.type); // The action type needs to be included
  };

  return function (store) {
    var setupSocket = function setupSocket(url) {
      socket = options.resolveSocket(url);

      socket.on(_constants.SOCKET_RECEIVE_ACTION, function (action) {
        store.dispatch(_extends({}, action, { emitted: true }));
      });

      socket.on('disconnect', function () {
        store.dispatch({
          type: _constants.SOCKET_DISCONNECT
        });
      });

      socket.on('reconnect', function () {
        store.dispatch({
          type: _constants.SOCKET_CONNECT
        });
      });

      return socket;
    };

    return function (next) {
      return function (action) {
        var result = undefined;
        if (_lodash2.default.isFunction(action)) {
          result = next(action(store.dispatch));
        } else {
          // We first execute the action locally
          result = next(action);
        }

        // We want to intercept a couple of actions related to sockets.
        switch (action.type) {
          case _constants.SOCKET_CONNECT:
            if (!socket) {
              socket = setupSocket(action.url);
            }
            break;
        }

        // If the action should be emitted we do so.
        if (shouldEmit(action)) {
          socket.emit(_constants.SOCKET_DISPATCH, action);
        }

        // Return the result to the next middleware.
        return result;
      };
    };
  };
}
module.exports = exports['default'];