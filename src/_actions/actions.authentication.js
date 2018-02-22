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
    userId: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    token: user.token
  }
};

export function authHasErrors(error) {
  return {
    type: 'LOGIN_HAS_ERRORS',
    loginError: error
  }
}

export function authenticateUser(username, password){
  console.log('Made it to the function');
  let loginData = {
    username: username,
    password: password
  };

  return (dispatch) => {
    return axios.post('//marcopromo.api/users/authenticate', loginData ).then((response) => {
      dispatch(authLogin(response.data.id));
      sessionStorage.setItem('user', response.data);
      sessionStorage.setItem('userId', response.data.id);
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('first_name', response.data.first_name);
      sessionStorage.setItem('last_name', response.data.last_name);
      sessionStorage.setItem('email', response.data.email);
      sessionStorage.setItem('phone', response.data.phone);
      sessionStorage.setItem('marcoPromoToken', response.data.token);
    }).catch((e) => {
      let response = JSON.parse(e.response.request.response);
      dispatch(authHasErrors("Error: Wrong Username/Password"));
      sessionStorage.setItem('error', response.message);
    });
  }
}



export function userLogOut() {
  return (dispatch) => {
    dispatch(authLogout());
  }
}

export function checkToken(token) {
  console.log(token);
  console.log(this.context.router);
  /*return function (dispatch) {
    // thunk

    let url = '//marcopromo.api/token/authenticate'

    axios.post(url, {token}).then(function (response) {
      if (response.data.success === true) {

        return dispatch({
          type: types.VALID_TOKEN,
          token: response.data.token,
          accessLevel: response.data.accessLevel,
          userId: response.data.userId,
          username: response.data.username,
          userFirstName: response.data.first_name,
          userLastName: response.data.last_name,
          userPhoto: response.data.photo,
          userRole: response.data.role,
          userMarket: response.data.market
        });
      } else {
        browserHistory.push('/login/');
      }
    }).catch(function() {
      browserHistory.push('/login');
    });
  };
  */
}