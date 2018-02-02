import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './reducers.items';
import { copies, copiesHasErrored, copiesIsLoading, copy, copyHasErrored, copyIsLoading } from './reducers.copies';
import { authHasErrored, authIsLoggingIn, authSuccess, authIsLoggedIn } from './reducers.authentication';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  copies,
  copiesHasErrored,
  copiesIsLoading,
  copy,
  copyHasErrored,
  copyIsLoading,
  authHasErrored,
  authIsLoggingIn,
  authSuccess,
  authIsLoggedIn
});