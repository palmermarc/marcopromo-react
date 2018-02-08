import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './reducers.items';
import { user } from './reducers.authentication';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  user
});