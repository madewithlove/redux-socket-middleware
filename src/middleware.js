
import merge from 'deepmerge';
import {SOCKET_DISPATCH, SOCKET_RECEIVE_ACTION, SOCKET_CONNECT} from './constants';

const defaultOptions = {
  blacklist: [
    SOCKET_CONNECT,
  ],
};

export default function socketMiddleware(options = defaultOptions) {
  let socket;
  options = merge(defaultOptions, options);

  // Determines wether or not an action should be emitted to the socket server.
  const shouldEmit = action => {
    return socket // We need a socket server
        && !action.emitted // If the action was emitted before, we will not emit it again.
        && !options.blacklist.includes(action.type); // Blacklisted actions are not emitted.
  };

  return store => next => action => {
    // We first execute the action locally
    const result = next(action);

    // We want to intercept a couple of actions related to sockets.
    switch (action.type) {
      case SOCKET_CONNECT:
          socket = options.resolveSocket(action.url);
          socket.on(SOCKET_RECEIVE_ACTION, action => {
            store.dispatch({...action, emitted: true});
          });
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
