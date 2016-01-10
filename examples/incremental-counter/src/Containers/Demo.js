import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import redux from './Redux/Redux';
import * as actions from '../ActionCreators/CounterActions';
import { actionCreators } from 'redux-socket-middleware';

@connect(state => ({
    counter: state.counter
}))
class Demo extends Component {
    componentDidMount() {
        this.props.dispatch(actionCreators.connect('http://localhost:3001'));
    }

    handleClick() {
        this.props.dispatch(actions.increment());
    }

    render() {
        const { counter } = this.props;

        return (
            <div>
                <p>{counter}</p>
                <button onClick={::this.handleClick}>Increment</button>
            </div>
        );
    }
}

const app = redux(Demo, {});

render(app, document.getElementById('app'));
