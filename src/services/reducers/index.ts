import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { authReducer } from './auth'

export const rootReducer = combineReducers({
  constructor: constructorReducer,
  auth: authReducer
});