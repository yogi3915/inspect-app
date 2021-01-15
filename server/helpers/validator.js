const register = (user) => {
  let status = 200;
  let message = 'Register success';

  if (!user.first_name) {
    status = 400;
    message = 'First Name required';
    return { status, message }
  }
  if (!user.last_name) {
    status = 400;
    message = 'Last Name required';
    return { status, message };
  }
  if (!user.email) {
    status = 400;
    message = 'Email required';
    return { status, message };
  }
  if (!user.password) {
    status = 400;
    message = 'Password required';
    return { status, message };
  }
  if (!user.nationalin) {
    status = 400;
    message = 'National Identity Number required';
    return { status, message };
  }
  return false;
}

module.exports = {
  register
}
