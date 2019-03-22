import {createAction} from 'redux-actions';

export const gotTask = createAction('tasks/GOT_TASK');
export const tasksLoaded = createAction('tasks/TASKS_LOADED');
export const someTasksLoaded = createAction('tasks/SOME_TASKS_LOADED');