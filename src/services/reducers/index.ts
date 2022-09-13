import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { authReducer } from './auth';
import { webSocketReducer } from './web-soket';

export const rootReducer = combineReducers({
  constructor: constructorReducer,
  auth: authReducer,
  orders: webSocketReducer
});