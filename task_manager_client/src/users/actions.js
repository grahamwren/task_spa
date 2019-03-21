import {createAction} from 'redux-actions';

export const newUser = createAction('users/NEW_USER');
export const usersLoaded = createAction('users/USERS_LOADED');