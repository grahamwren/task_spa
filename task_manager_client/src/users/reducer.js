import {handleActions} from 'redux-actions';
import {newUser, usersLoaded} from './actions';

export default handleActions({
  [newUser]: (state, {payload: userData}) =>
    Object.assign(state, {
      users: Object.assign(state.users, {
        [userData.id]: userData
      })
    }),
  [usersLoaded]: (state, {payload: usersList = []}) => {
    const users = usersList.reduce((acc, user) => {
      return Object.assign(acc, {
        [user.id]: user
      });
    }, {});
    return Object.assign(state, {users});
  }
}, {});