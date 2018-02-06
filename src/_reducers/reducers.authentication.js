import initialState from '../_store/InitialState';

export function authUser(state = initialState, action) {
  switch (action.type) {
    case 'LOGOUT':
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: []
      });
    case 'LOGIN_HAS_ERRORS':
      return Object.assign({}, state, {
        isLoggedIn: false,
        loginError: action.error
      });
    case 'LOGIN':
      return Object.assign({}, state, {
        isLoggedIn: true,
        userId: action.userId
      });
    default:
      return state;
  }
}