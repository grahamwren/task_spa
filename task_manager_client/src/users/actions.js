import {createAction} from 'redux-actions';

export const gotUser = createAction('users/GOT_USER');
export const usersLoaded = createAction('users/USERS_LOADED');