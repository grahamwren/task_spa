import $ from 'jquery';
import {baseUrl} from "../../config";

const jsToEx = task => ({
  title: task.title,
  description: task.description,
  completed: task.completed,
  time_worked: task.time_worked || task.timeWorked,
  user_id: task.user_id || task.userId
});

export default {
  createTask(data) {
    const task = jsToEx(data);
    return $.ajax(`${baseUrl}/tasks`, {
      method: 'POST',
      data: JSON.stringify({task}),
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    })
  },
  getTasks() {
    return $.ajax(`${baseUrl}/tasks`, {
      method: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    })
  },
  getTasksForUser(userId) {
    return $.ajax(`${baseUrl}/users/${userId}/tasks`, {
      method: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    })
  },
  getTask(id) {
    return $.ajax(`${baseUrl}/tasks/${id}`, {
      method: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  updateTask(id, data) {
    const task = jsToEx(data);
    return $.ajax(`${baseUrl}/tasks/${id}`, {
      type: 'PUT',
      data: JSON.stringify({task}),
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    })
  },
  deleteTask(id) {
    return $.ajax(`${baseUrl}/tasks/${id}`, {
      type: 'DELETE',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    })
  }
}