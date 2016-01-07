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
* [ ] "agnostic" package that works with web sockets instead of socket.io specifically.
