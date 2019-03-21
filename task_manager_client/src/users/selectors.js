import get from 'lodash/get';
import {getCurrentUserId} from '../api';

export function getCurrentUser(state) {
  const currentUserId = getCurrentUserId(state);
  return get(state, `users.${currentUserId}`);
}
