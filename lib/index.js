'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionCreators = require('./actionCreators');

var actions = _interopRequireWildcard(_actionCreators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  middleware: require('./middleware'),
  server: require('./server'),
  actionCreators: actions
};
module.exports = exports['default'];