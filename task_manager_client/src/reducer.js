import {combineReducers} from 'redux';
import apiReducer from './api/reducer';

export default combineReducers({
  api: apiReducer
});