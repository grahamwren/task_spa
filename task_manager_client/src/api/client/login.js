import $ from 'jquery';
import {baseUrl} from '../../config';

export default async function loginUser(email, password) {
  return await $.post(`${baseUrl}/login`, {
    email,
    password
  });
}
