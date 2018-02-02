export function authHasErrored(state = false, action) {
  switch (action.type) {
    case 'AUTH_HAS_ERRORED' :
      return action.hasErrored;
    default:
      return state;
  }
}

export function authIsLoggingIn(state = false, action) {
  switch (action.type) {
    case 'IS_LOGGING_IN':
      return action.isLoading;
    default:
      return state;
  }
}

export function authSuccess(state = [], action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.user;
    default:
      return state;
  }
}

export function authIsLoggedIn(state = false, action) {
  switch (action.type) {
    case 'IS_LOGGED_IN':
      return action.isLoggedIn;
    default:
      return state;
  }
}


