__EXPERIMENTAL, DO NOT USE IN PRODUCTION YET__

## redux-socket-middleware

Middleware that dispatches [Redux](https://github.com/rackt/redux) actions to all connected clients.

### Usage

_Documentation on how to use this middleware will follow once a 0.1.0 release is available._

### TODO

* [ ] Write tests

__Nice to haves__

* [ ] Cleaner API to whitelist action types, eg whitelisting an entire namespace: `Acme/***` ect.
* [ ] "agnostic" package so that developers can choose which backend implementation to use (by making a wrapper around emitting/receiving events)
* [ ] Able to choose when to connect to the socket server, currently this is when redux is initalized but in certain (most) cases you want to load some initial data before connecting to a socket. You should be able to by dispatching an action.
