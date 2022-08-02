import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';

export const rootReducer = combineReducers({
    constructor: constructorReducer
  });