export default function getUserName(user, emailFallback = true) {
  let result = '';
  if (user) {
    if (user.firstName) {
      result = user.firstName;
    }
    if (user.lastName) {
      result += result ? ` ${user.lastName}` : user.lastName;
    }
    if (!result && user.email && emailFallback) {
      result = user.email;
    }
  }
  return result;
}