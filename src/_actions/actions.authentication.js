import axios from 'axios';

export function authHasErrored(bool) {
  return {
    type: 'AUTH_HAS_ERRORED',
    hasErrored: bool
  };
}

export function authIsLoggingIn(bool) {
  return{
    type: 'IS_LOGGING_IN',
    isLoggingIn: bool
  }
}

export function authSuccess(user) {
  return{
    type: 'LOGIN_SUCCESS',
    user: user
  }
}

export function authIsLoggedIn(bool) {
  return {
    type: 'IS_LOGGED_IN',
    isLoggedIn: bool
  }
}

export function authenticateUserInfo(url, username, password) {
  return (dispatch) => {
    dispatch(authIsLoggingIn(true));

    let loginInfo = {
      username: username,
      password: password
    };

    axios.post('//marcopromo.api/' + url, loginInfo)
      .then((response) => {

        dispatch(authIsLoggingIn(false));

        return response;
      })
      .then((user) => {
        sessionStorage.setItem('user', user.data);
        dispatch(authSuccess(user.data));
      })
      .catch(() => {
        dispatch(authIsLoggingIn(false));
        dispatch(authHasErrored(true));
      });
  }
}

export function userLogOut() {
  return (dispatch) => {
    dispatch(authIsLoggedIn(false));
  }
}