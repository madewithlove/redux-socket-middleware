import { applyMiddleware } from 'redux';
import io from 'socket.io-client';
import { middleware } from 'redux-socket-middleware';

export default applyMiddleware(
  middleware({
    actions: [
      'counter/INCREMENT',
    ],
    resolveSocket: (url) => {
      return io(url);
    },
  })
);
