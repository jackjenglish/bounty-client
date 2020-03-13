export function setLocalAuthData(authData) {
  localStorage.setItem('authData', JSON.stringify(authData));
}

export function getLocalAuthData(authData) {
  return JSON.parse(localStorage.getItem('authData'));
}

export function clearLocalAuthData() {
  localStorage.clear('authData');
}

export function initializeAuthState() {
  const authData = getLocalAuthData();
  if (authData) {
    return {
      loggedIn: true,
      user: authData.user,
      token: authData.token,
      ui: {
        loginRequesting: false
      }
    };
  } else {
    return {
      loggedIn: false,
      user: null,
      token: null,
      ui: {
        loginRequesting: false
      }
    };
  }
}
