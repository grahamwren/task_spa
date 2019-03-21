import get from 'lodash/get';

export function getCurrentUserId(state) {
  return get(state, 'api.session.userId');
}