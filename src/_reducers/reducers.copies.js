import initialState from '../store/InitialState';

export function copies(state = initialState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {
    case 'copies':
      newState.copies = action.copies;
      console.log(newState);
      return newState;
    case 'COPIES_HAS_ERRORS':
      newState.isLoggedIn = false;
      newState.loginError = action.error;
      console.log(newState);
      return newState;
    case 'COPIES_ARE_LOADING':
      newState.copies = null;
      newState.areLoading = true;
      return newState;
    default:
      return state;
  }
}