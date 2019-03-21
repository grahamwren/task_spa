import {handleActions} from 'redux-actions';
import * as a from '../api/actions';
import api from './client';

function getInitState() {
  const sessionData = localStorage.getItem('session-data');
  return sessionData ? {
    session: JSON.parse(sessionData)
  } : {};
}

export default handleActions({
  [a.loggedIn]: (state, {payload: {user_id: userId, token}}) => {
    localStorage.setItem('session-data', JSON.stringify({userId, token}));
    api.setToken(token);
    return Object.assign({}, state, {
      session: {
        userId,
        token
      }
    });
  },
  [a.logoutUser]: state => {
    localStorage.removeItem('session-data');
    api.logout();
    return Object.assign({}, state, {session: undefined});
  }
}, getInitState());