import userMethods from './users';
import taskMethods from './tasks';

function Client() {
  this.token = localStorage.getItem('auth-token');
}

Client.prototype = {
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
};

export default new Client();