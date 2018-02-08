import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import combineReducers from '../_reducers';

function configureStoreProd(initialState) {
  const middlewares = [
    thunk,
  ];

  return createStore(combineReducers, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}

function configureStoreDev(initialState) {
  const middlewares = [
    thunk,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(combineReducers, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../_reducers', () => {
      const nextReducer = require('../_reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
