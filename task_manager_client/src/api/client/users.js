import $ from 'jquery';
import {baseUrl} from "../../config";

export default {
  createUser(data) {
    return $.ajax(`${baseUrl}/users`, {
      method: 'POST',
      data,
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
    return $.ajax(`${baseUrl}/users/${id}`, {
      type: 'PUT',
      data: JSON.stringify({user: data}),
      contentType: 'application/json',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    })
  }
}