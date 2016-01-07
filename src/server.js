import {SOCKET_DISPATCH_MESSAGE, SOCKET_RECEIVE_ACTION} from './constants';

export default (socket) => {
  socket.on('redux-socket-middleware/DISPATCH_ACTION', action => {
    socket.broadcast.emit('redux-socket-middleware/RECEIVE_ACTION', action);
  });
};
