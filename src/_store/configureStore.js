import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
//import InitialState from 'InitialState';

let InitialState = {
  user : {
    isLoggedIn: false,
    userId: null,
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    token: null,
  }
};

export default function configureStore() {
  return createStore(
    rootReducer,
    InitialState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
}