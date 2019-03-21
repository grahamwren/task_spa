import {combineReducers} from 'redux';
import apiReducer from './users/reducer';
import {usersReducer} from './users';

export default combineReducers({
  api: apiReducer,
  users: usersReducer
});