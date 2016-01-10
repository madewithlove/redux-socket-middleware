if (__DEVTOOLS__) {
    module.exports = require('./ReduxDevtools');
} else {
    module.exports = require('./Redux');
}
