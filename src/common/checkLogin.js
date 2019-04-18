export function checkLogin() {
  const token = window.localStorage.getItem('token');
  if(!token) {
      return false;
  }
  return token;
}  