import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducer';

const rootReducer = combineReducers({Reducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
