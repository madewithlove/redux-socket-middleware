import {createStore, compose} from 'redux';
import reducers from '../Reducers';
import middlewares from './SharedMiddleware';

const finalCreateStore = compose(
    middlewares,
)(createStore);

export default function create(initial = {}) {
    return finalCreateStore(reducers, initial);
}
