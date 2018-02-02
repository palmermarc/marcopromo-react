import initialState from '../_store/InitialState';

export function authUser(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isLoggedIn: action.isLoggedIn,
        user: action.user
      };
    case 'LOGIN_HAS_ERRORS':
      return {
        hasErrors: action.hasErrors
      }
    default:
      return state;
  }
}