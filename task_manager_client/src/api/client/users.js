import $ from 'jquery';
import {baseUrl} from "../../config";

export default {
  createUser(user) {
    user = {
      email: user.email,
      password: user.password,
      first_name: user.first_name || user.firstName,
      last_name: user.last_name || user.lastName
    };
    return $.ajax(`${baseUrl}/users`, {
      method: 'POST',
      data: JSON.stringify({user}),
      beforeSend: xhr => {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    })
  },
  loginUser(email, password) {
    return $.ajax(`${baseUrl}/login`, {
      method: 'POST',
      data: JSON.stringify({email, password}),
      beforeSend: xhr => {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    });
  },
  getUsers() {
    return $.ajax(`${baseUrl}/users`, {
      method: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    })
  },
  getUser(id) {
    return $.ajax(`${baseUrl}/users/${id}`, {
      method: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  updateUser(id, data) {
    const user = {
      email: data.email,
      password: data.password,
      first_name: data.first_name || data.firstName,
      last_name: data.last_name || data.lastName
    };
    return $.ajax(`${baseUrl}/users/${id}`, {
      type: 'PUT',
      data: JSON.stringify({user}),
      contentType: 'application/json',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    })
  },
  deleteUser(id) {
    return $.ajax(`${baseUrl}/users/${id}`, {
      type: 'DELETE',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    })
  }
}