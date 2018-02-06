import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux';

import logo from './assets/images/logo.svg';
import Nav from './containers/template/Nav';
import CopiesList from './copies';
import ItemList from './items.js';
import editCopy from './editCopy';

import LogoutPage from './containers/users/logout';
import LoginPage from './containers/users/login';

//import EditProfile from './containers/users/editProfile';

class App extends React.Component {

  componentWillMount() {

  }

  render() {
    return (
          <header className="App-header">
            <Link to="/">
              <img className="App-logo" src={logo} alt="Hubbard Interactive" />
            </Link>
          </header>
          <div id="content" className="container_bin">
            <Route exact path="/" component={ItemList} />
            <Route exact path="/copy/" component={CopiesList} />
            <Route exact path="/copy/:copyid/" component={editCopy} />
            <Route exact path="/user/logout/" component={LogoutPage} />
            <Route exact path="/user/login/" component={LoginPage} />
          </div>
        </div>
      </Router>

    )
  }
  //{!this.props.isLoggedIn ? <Redirect to="/users/login/" /> : ''}
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);