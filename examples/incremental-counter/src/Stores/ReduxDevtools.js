import { createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import reducers from '../Reducers';
import DevTools from '../Containers/Redux/Devtools';
import middlewares from './SharedMiddleware';

const finalCreateStore = compose(
    middlewares,
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(reducers, initialState);

    if (module.hot) {
        module.hot.accept('../Reducers', () =>
            store.replaceReducer(require('../Reducers'))
        );
    }

    return store;
}
