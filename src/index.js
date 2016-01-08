import * as actions from './actionCreators';

export default {
  middleware: require('./middleware'),
  server: require('./server'),
  actionCreators: actions
}
