import axios from 'axios';

function authLogout() {
  return {
    type: 'LOGOUT'
  };
};

function authLogin(user) {
  return {
    type: 'LOGIN',
    isLoggedIn: true,
    userId: user
  }
};

export function authHasErrors(error) {
  return {
    type: 'LOGIN_HAS_ERRORS',
    loginError: error
  }
}

export function authenticateUser(username, password){
  let loginData = {
    username: username,
    password: password
  };

  return (dispatch) => {
    return axios.post('//marcopromo.api/users/authenticate', loginData ).then((response) => {
      dispatch(authLogin(response.data.id));
      sessionStorage.setItem('user', response.data);
      sessionStorage.setItem('user_id', response.data.id);
      sessionStorage.setItem('token', response.data.token);
    }).catch((e) => {
      let response = JSON.parse(e.response.request.response);
      dispatch(authHasErrors(response.message));
      sessionStorage.setItem('error', response.message);
    });
  }
}

export function userLogOut() {
  return (dispatch) => {
    dispatch(authLogout());
  }
}

/*import axios from 'axios';

export function authHasErrored(bool) {
  return {
    type: 'AUTH_HAS_ERRORED',
    hasErrored: bool
  };
}

export function authIsLoggedIn(bool) {
  return  {
    type: 'IS_LOGGED_IN',
    isLoggedIn: bool
  }
}

export function authenticateUser(submittedUsername, submittedPassword) {

  let loginData = {
    username: submittedUsername,
    password: submittedPassword
  };

  axios.post('//marcopromo.api/users/authenticate', loginData )
    .then((response) => {
      return response;
    })
    .then((user) => {
      if (user.data.token != null) {
        sessionStorage.setItem('user', user.data.id);
        sessionStorage.setItem('token', user.data.token);
        return (dispatch) => {
          dispatch(authIsLoggedIn(true));
        }
      } else {
        return (dispatch) => {
          dispatch(authHasErrored(true));
        }
      }
    })
    .catch(() => {
      return (dispatch) => {
        dispatch(authHasErrored(true));
      }
    });
}

export function userLogOut() {
  return (dispatch) => {
    dispatch(authIsLoggedIn(false));
  }
}

/**
 let loginData = {
    username: submittedUsername,
    password: submittedPassword
  };

 console.log(loginData);

 return (dispatch) => {
    dispatch(authIsLoggingIn(true));

    axios.post('//marcopromo.api/users/authenticate', loginData )
      .then((response) => {
        return response;
      })
      .then((user) => {
      console.log(user);
        sessionStorage.setItem('user', user.data.id);
        sessionStorage.setItem('token', user.data.token);
        dispatch(authIsLoggedIn(true));
        dispatch(authSuccess(true, user.data));
      })
      .catch(() => {
        dispatch(authHasErrored(true));
      });
  }
 **/