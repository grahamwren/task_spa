import {createAction} from 'redux-actions';

export const loggedIn = createAction('api/LOGGED_IN');
export const logoutUser = createAction('api/LOGOUT_USER');