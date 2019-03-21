import get from 'lodash/get';
import {getCurrentUserId} from '../api';

export function getUser(state, userId) {
  return get(state, `users.users.${userId}`);
}

export function getCurrentUser(state) {
  return getUser(state, getCurrentUserId(state));
}

export function getUsers(state) {
  return get(state, 'users.users');
}