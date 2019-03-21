import {handleActions} from 'redux-actions';
import merge from 'lodash/merge';
import {newUser} from './actions';

export default handleActions({
  [newUser]: (state, {payload: userData}) => merge(state, {
    users: {
      [userData.id]: userData
    }
  })
}, {});