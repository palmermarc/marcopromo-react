import React from 'react';
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Nav from './containers/Nav';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './containers/Login';
import CopiesList from './containers/Copies';
import EditCopy from './containers/EditCopy';
import CreateCopy from './containers/CreateCopy';
import ListenersList from './containers/Listeners';
//import editCopy from './editCopy';

import LogoutPage from './containers/users/logout';

const history = createBrowserHistory();

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Nav></Nav>
          <div id="content" className="content">
            <div id="content_bin">
              <Route exact path="/" component={CopiesList} />
              <Route exact path="/copy/" niceName="Copies" component={CopiesList} />
              <Route exact path="/copy/create/" component={CreateCopy} />
              <Route exact path="/copy/edit/:copyId/" component={EditCopy} />
              <Route exact path="/user/logout/" component={LogoutPage} />
              <Route exact path="/user/login/" component={Login} />
              <Route exact path="/listeners/" component={ListenersList} />
            </div>
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