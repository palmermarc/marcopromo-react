import React from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux';
import logo from './assets/images/logo.svg';
import Nav from './containers/template/Nav';
import CopiesList from './copies';
import ItemList from './items.js';
import editCopy from './editCopy';

//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';


import LogoutPage from './containers/users/logout';
import LoginPage from './containers/users/login';

//import EditProfile from './containers/users/editProfile';

class App extends React.Component {
  render() {
    return (

      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <img className="App-logo" src={logo} alt="Hubbard Interactive" />
            </Link>
          </header>
          <Nav></Nav>
          <div id="content" className="container_bin">
            {!this.props.isLoggedIn ? <Redirect to="/users/login/" /> : ''}
            <Route exact path="/" component={ItemList} />
            <Route exact path="/copy/" component={CopiesList} />
            <Route exact path="/copy/:copyid/" component={editCopy} />
            <Route exact path="/users/logout/" component={LogoutPage} />
            <Route exact path="/users/login/" component={LoginPage} />
          </div>
        </div>
      </Router>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authIsLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);