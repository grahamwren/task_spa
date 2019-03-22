import {handleActions} from 'redux-actions';
import keyBy from 'lodash/keyBy';
import {gotTask, someTasksLoaded, tasksLoaded} from './actions';

const exToJs = task => ({
  id: task.id,
  title: task.title,
  completed: task.completed,
  description: task.description,
  timeWorked: task.time_worked,
  userId: task.user_id
});

export default handleActions({
  [gotTask]: (state, {payload: task}) =>
    Object.assign({}, state, {
      tasks: Object.assign(state.tasks || {}, {
        [task.id]: exToJs(task)
      })
    }),
  [tasksLoaded]: (state, {payload: tasksList = []}) => {
    const tasks = keyBy(tasksList.map(exToJs), 'id');
    return Object.assign({}, state, {tasks});
  },
  [someTasksLoaded]: (state, {payload: tasksList = []}) => {
    const tasks = tasksList.reduce((acc, task) => {
      return Object.assign(acc, {
        [task.id]: exToJs(task)
      });
    }, state.tasks || {});
    return Object.assign({}, state, {tasks});
  }
}, {});