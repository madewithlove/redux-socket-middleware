export default (socket) =>  {
    return store => {
        socket.on('redux-socket-middleware/DISPATCH_ACTION', (action) => {
            store.dispatch({...action, dispatched: true});
        });

        return next => action => {
            const result = next(action);

            if (!action.dispatched) {
                socket.emit('redux-socket-middleware/RECEIVE_ACTION', action);
            }

            return result;
        };
    }
}
