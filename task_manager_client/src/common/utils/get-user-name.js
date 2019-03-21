export default function getUserName(user) {
  let result = '';
  if (user) {
    if (user.first_name) {
      result = user.first_name;
    }
    if (user.last_name) {
      result += result ? ` ${user.last_name}` : user.last_name;
    }
    if (!result && user.email) {
      result = user.email;
    }
  }
  return result;
}