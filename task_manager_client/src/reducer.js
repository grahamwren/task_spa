import {combineReducers} from 'redux';
import {apiReducer} from './api';
import {usersReducer} from './users';

export default combineReducers({
  api: apiReducer,
  users: usersReducer
});