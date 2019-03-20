import loginUser from "./login";

function Client() {
  this.token = localStorage.getItem('auth-token');
}

Client.prototype = {
  login: loginUser,
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