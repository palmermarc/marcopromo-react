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

export function authenticateUser(submittedUsername, submittedPassword) {

  return (dispatch) => {
    dispatch(authIsLoggingIn(true));

    let loginData = {
      username: submittedUsername,
      password: submittedPassword
    };

    axios.post('//marcopromo.api/users/authenticate', loginData )
      .then((response) => {
        console.log(response);
        dispatch(authIsLoggingIn(false));

        return response;
      })
      .then((user) => {
        console.log(user.data);
        sessionStorage.setItem('user', user.data.id);
        sessionStorage.setItem('token', user.data.token);
        dispatch(authIsLoggedIn(true));
        dispatch(authSuccess(user.data));
      })
      .catch(() => {
        dispatch(authHasErrored(true));
      });
  }
}

export function userLogOut() {
  return (dispatch) => {
    dispatch(authIsLoggedIn(false));
  }
}