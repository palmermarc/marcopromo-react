import initialState from '../store/InitialState';

export function user(state = initialState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {
    case 'LOGOUT':
      newState.isLoggedIn = false;
      newState.userId = null;
      newState.username = null;
      newState.first_name = null;
      newState.last_name = null;
      newState.email = null;
      newState.phone = null;
      newState.token = null;
      return newState;
    case 'LOGIN_HAS_ERRORS':
      newState.isLoggedIn = false;
      newState.loginHasErrors = true;
      newState.loginError = action.loginError;
      return newState;
    case 'LOGIN':
      newState.isLoggedIn = true;
      newState.loginHasErrors = false;
      newState.userId = user.userId;
      newState.username = user.username;
      newState.first_name = user.first_name;
      newState.last_name = user.last_name;
      newState.email = user.email;
      newState.phone =  user.phone;
      newState.token = user.token;
      return newState;
    default:
      return state;
  }
}