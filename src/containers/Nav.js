import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, Redirect } from 'react-router-dom'
import '../assets/css/navSidebar.css';
import logo from '../assets/images/logo.svg';


class Nav extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    //let token = localStorage.getItem("token");
  }

  render() {

    let activeStyling = {
      "font-weight" : "bold"
    };

    return (

        <div id="navSidebar">
          {this.props.isLoggedIn ?
            <div id="navSidebar-menu">
              <header>
                <Link to="/">
                  <img className="App-logo" src={logo} alt="Hubbard Interactive"/>
                </Link>
              </header>
              <nav>
                <ul className="navigation">
                  <li><NavLink activeStyle={activeStyling} to="/copy/">Copy</NavLink></li>
                  <li><NavLink activeStyle={activeStyling} to="/contests/">Contests</NavLink></li>
                  <li><NavLink activeStyle={activeStyling} to="/listeners/">Listeners</NavLink></li>
                  <li><NavLink activeStyle={activeStyling} to="frontdesk/">Front Desk</NavLink></li>
                </ul>
              </nav>
            </div>
          :
            <div id="navSidebar-menu">
              <header>
                <Link to="/">
                  <img className="App-logo" src={logo} alt="Hubbard Interactive"/>
                </Link>
              </header>
              <nav>
                <ul className="navigation">
                  <li><NavLink to="/user/login/">Log In</NavLink></li>
                </ul>
              </nav>
            </div>
          }
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    /*username: state.main.username,
    userPhoto: state.main.userPhoto,
    sidebarNavActive: state.main.sidebarNavActive,
    errors: state.main.errors,
    notification: state.main.notification*/
  };
};

export default connect(mapStateToProps)(Nav);