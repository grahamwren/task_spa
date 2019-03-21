import {handleActions} from 'redux-actions';
import {gotUser, usersLoaded} from './actions';

export default handleActions({
  [gotUser]: (state, {payload: userData}) =>
    Object.assign({}, state, {
      users: Object.assign(state.users || {}, {
        [userData.id]: {
          id: userData.id,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name
        }
      })
    }),
  [usersLoaded]: (state, {payload: usersList = []}) => {
    const users = usersList.reduce((acc, user) => {
      return Object.assign(acc, {
        [user.id]: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        }
      });
    }, {});
    return Object.assign({}, state, {users});
  }
}, {});