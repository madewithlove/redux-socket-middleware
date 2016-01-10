import { SOCKET_CONNECT } from './constants';

export function connect(url) {
  return {
    type: SOCKET_CONNECT,
    url,
  };
}
