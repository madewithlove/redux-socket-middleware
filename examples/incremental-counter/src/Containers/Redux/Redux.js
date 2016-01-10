import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../../Stores';
import Devtools from './Devtools';

export default function redux(Element, state) {
    const elements = [<Element key="app" />];

    // Append devtools if necessary
    if (__DEVTOOLS__) {
        elements.push(<Devtools key="devtools" />);
    }

    return (
        <Provider key="provider" store={createStore(state)}>
            <div>{elements}</div>
        </Provider>
    );
}
