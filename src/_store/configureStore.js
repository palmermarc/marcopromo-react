import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';

let storeInitialState = {
  authUser: {}
};

export default function configureStore() {
  return createStore(
    rootReducer,
    storeInitialState,
    applyMiddleware(thunk)
  )
}