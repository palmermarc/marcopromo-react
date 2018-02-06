import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import '../assets/css/navSidebar.css';
import logo from '../assets/images/logo.svg';


class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let token = localStorage.getItem("token");
  }

  render() {
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
                  <li><Link to="/copy/">Copy</Link></li>
                  <li><Link to="/contests/">Contests</Link></li>
                  <li><Link to="/listeners/">Listeners</Link></li>
                  <li><Link to="frontdesk/">Front Desk</Link></li>
                </ul>
              </nav>
            </div>
          :
          <Redirect to="/user/login/" />
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