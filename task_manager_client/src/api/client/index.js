import mapValues from 'lodash/mapValues'
import userMethods from './users';
import taskMethods from './tasks';

function Client() {
  this.token = localStorage.getItem('auth-token');
}

Client.prototype = mapValues({
  ...userMethods,
  ...taskMethods,
  logout() {
    this.token = null;
    localStorage.removeItem('auth-token');
  },
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth-token', token);
  }
}, method => {
  return async function(...a) {
    try {
      return await method.apply(this, a);
    } catch (e) {
      if (e.status === 401) {
        window.location = '/logout';
      }
      throw e;
    }
  }
});

export default new Client();