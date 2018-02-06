import React from 'react';
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Nav from './containers/Nav';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './containers/Login';
import CopiesList from './copies';
import ItemList from './items.js';
import editCopy from './editCopy';

import LogoutPage from './containers/users/logout';

const history = createBrowserHistory();

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Nav></Nav>
          <div className="content">
            <Route exact path="/" component={ItemList} />
            <Route exact path="copy/" component={CopiesList} />
            <Route exact path="copy/:copyid/" component={editCopy} />
            <Route exact path="user/logout/" component={LogoutPage} />
            <Route exact path="user/login/" component={Login} />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);