import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './reducers.items';
import { copies, copiesHasErrored, copiesIsLoading, copy, copyHasErrored, copyIsLoading } from './reducers.copies';
import { user } from './reducers.authentication';

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
  user
});