const defaultOptions = {
  blacklist: [],
};

export default (socket, options = defaultOptions) =>  {
  options = Object.assign(defaultOptions, options);

  // Determines wether or not an action should be emitted to the socket server.
  const shouldEmit = action => {
    return !action.emitted // If the action was emitted before, we will not emit it again.
        && !options.blacklist.includes(action.type); // Blacklisted actions are not emitted.
  };

  return store => {
    // We listen to the DISPATCH_ACTION message of our socket server, which will trigger
    // the given action on the client.
    socket.on('redux-socket-middleware/DISPATCH_ACTION', (action) => {
      store.dispatch({...action, emitted: true});
    });

    return next => action => {
      // We first execute the action locally
      const result = next(action);

      // If the action should be emitted we do so.
      if (shouldEmit(action)) {
        socket.emit('redux-socket-middleware/RECEIVE_ACTION', action);
      }

      // Return the result to the next middleware.
      return result;
    };
  }
}
