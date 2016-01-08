
import merge from 'deepmerge';
import {SOCKET_DISPATCH, SOCKET_RECEIVE_ACTION, SOCKET_CONNECT, SOCKET_DISCONNECT} from './constants';

const defaultOptions = {
  actions: [],
};

export default function socketMiddleware(options = defaultOptions) {
  let socket;
  options = merge(defaultOptions, options);

  // Determines wether or not an action should be emitted to the socket server.
  const shouldEmit = action => {
    return socket // We need a socket server
        && !action.emitted // If the action was emitted before, we will not emit it again.
        && options.actions.includes(action.type); // The action type needs to be included
  };

  return store => {
    const setupSocket = (url) => {
      socket = options.resolveSocket(url);

      socket.on(SOCKET_RECEIVE_ACTION, action => {
        store.dispatch({...action, emitted: true});
      });

      socket.on('disconnect', () => {
        store.dispatch({
          type: SOCKET_DISCONNECT,
        });
      });

      socket.on('reconnect', () => {
        store.dispatch({
          type: SOCKET_CONNECT,
        });
      });

      return socket;
    }

    return next => action => {
      // We first execute the action locally
      const result = next(action);

      // We want to intercept a couple of actions related to sockets.
      switch (action.type) {
        case SOCKET_CONNECT:
          if (!socket) {
            socket = setupSocket(action.url);
          }
          break;
      }

      // If the action should be emitted we do so.
      if (shouldEmit(action)) {
        socket.emit(SOCKET_DISPATCH, action);
      }

      // Return the result to the next middleware.
      return result;
    };
  }
}
