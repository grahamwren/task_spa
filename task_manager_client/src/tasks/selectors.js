import get from 'lodash/get';
import keyBy from 'lodash/keyBy';

export function getTask(state, taskId) {
  return get(state, `tasks.tasks.${taskId}`);
}

export function getTasksForUserId(state, userId) {
  const tasks = Object.values(getTasks(state) || {});
  tasks.filter(task => task.userId === userId);
  return keyBy(tasks, 'id');
}

export function getTasks(state) {
  return get(state, 'tasks.tasks');
}