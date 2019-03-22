import {combineReducers} from 'redux';
import {apiReducer} from './api';
import {usersReducer} from './users';
import {tasksReducer} from './tasks';

export default combineReducers({
  api: apiReducer,
  users: usersReducer,
  tasks: tasksReducer
});