import {handleActions} from 'redux-actions';
import merge from 'lodash/merge';
import {loggedIn} from '../api/actions';
import api from './client';

export default handleActions({
  [loggedIn]: (state, {payload: {userId, token}}) => {
    api.setToken(token);
    return merge(state, {
      session: {
        userId,
        token
      }
    });
  }
}, {});