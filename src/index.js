import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

const firstReducer = (state = 0, action) => {
    if (action.type === 'BUTTON_ONE') {
        console.log('firstReducer state', state);
        console.log('Button 1 was clicked!');
        return state + 1;
    }
    return state;
};

const secondReducer = (state = 100, action) => {
    if (action.type === 'BUTTON_TWO') {
        console.log('secondReducer state', state);
        console.log('Button 2 was clicked!');
        return state - 1;
    }
    return state;
};

const elementListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
};    


// worker saga
function* fetchElements() {
    // does get request!
    try {
        const response = yield axios.get('/api/element');
        console.log(response.data);
        // put effect is the same as dispatch in a saga
        yield put({ type: 'SET_ELEMENTS', payload: response.data});
    } catch (err) {
        console.error('error with element get request', err);
    }
    // axios.get('/api/element').then(response => {
    //     dispatch({ type: 'SET_ELEMENTS', payload: response.data });
    //   })
    //     .catch(error => {
    //       console.log('error with element get request', error);
    //     });
}

function* postElement(action) {
    try {
        yield axios.post('/api/element', action.payload);
        yield put({type: 'FETCH_ELEMENTS'});
    } catch (err) {
        console.error('error with element post request', err)
    }
}


// this is the saga that will watch for actions
function* watcherSaga() {
    // FETCH_ELEMENTS
    yield takeEvery('FETCH_ELEMENTS', fetchElements);
    // action and worker function don't need to be named the same
    yield takeEvery('ADD_ELEMENT', postElement);

}


const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        firstReducer,
        secondReducer,
        elementListReducer,
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={storeInstance}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
