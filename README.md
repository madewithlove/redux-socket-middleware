__EXPERIMENTAL, DO NOT USE IN PRODUCTION YET__

## redux-socket-middleware

Middleware that dispatches [Redux](https://github.com/rackt/redux) actions to all connected clients.

### Usage

_Documentation on how to use this middleware will follow once a 0.1.0 release is available._

### Roadmap

* [ ] Write tests
* [ ] Adding actions that allow developer to hook into socket events (connecting, disonnecting) so the UI can be updated accordingly
* [ ] Silently fail when disconnecting from socket
* [ ] Switch to whitelisting actions instead of blacklisting (to prevent overflowing your socket server with actions fired from within a library)
* [ ] Cleaner API to whitelist action types, eg whitelisting an entire namespace: `Acme/***` ect.
* [ ] "agnostic" package so that developers can choose which backend implementation to use (by making a wrapper around emitting/receiving events)
* [ ] Able to choose when to connect to the socket server, currently this is when redux is initalized but in certain (most) cases you want to load some initial data before connecting to a socket. You should be able to by dispatching an action.
