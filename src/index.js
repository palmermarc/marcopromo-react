import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/style.css';

import App from './App';
import { Provider } from 'react-redux';
import configureStore from './_store/configureStore';

import registerServiceWorker from './registerServiceWorker';

let store = configureStore();

ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));

registerServiceWorker();