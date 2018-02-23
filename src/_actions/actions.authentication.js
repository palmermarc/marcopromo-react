import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import MarcoPromo from '../core/MarcoPromo';

const history = createHistory();

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
  let loginData = {
    username: username,
    password: password
  };

  return (dispatch) => {
    return axios.post('//marcopromo.api/users/authenticate', loginData ).then((response) => {
      sessionStorage.setItem('marcoPromoToken', response.data.token);
      sessionStorage.setItem('user', response.data);
      sessionStorage.setItem('userId', response.data.id);
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('first_name', response.data.first_name);
      sessionStorage.setItem('last_name', response.data.last_name);
      sessionStorage.setItem('email', response.data.email);
      sessionStorage.setItem('phone', response.data.phone);
      dispatch(authLogin(response.data.id));
    }).catch((e) => {
      console.log(e);
      let response = JSON.parse(e.response.request.response);
      dispatch(authHasErrors("Error: Wrong Username/Password"));
    });
  }
}



export function userLogOut() {
  return (dispatch) => {
    dispatch(authLogout());
  }
}

export function checkToken() {

  return function (dispatch) {

    let url = 'users/validate';

    MarcoPromo.get(url, {}, function (response) {
      if( response.data.status === 'success' ) {
        sessionStorage.setItem('userId', response.data.id);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('first_name', response.data.first_name);
        sessionStorage.setItem('last_name', response.data.last_name);
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('phone', response.data.phone);
        dispatch(authLogin(response.data.id));
      } else {
        dispatch(authHasErrors(response.data.message));
        dispatch(userLogOut());
        history.push('/login/');
      }
    },function(e) {
      dispatch(authHasErrors(e.response.data.message));
      dispatch(userLogOut());
      history.push('/login/');
    });
  };

}