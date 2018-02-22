import React from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom'
import '../assets/css/navSidebar.css';
import logo from '../assets/images/logo.svg';


class Nav extends React.Component {
  render() {
    return (

      <div id="navSidebar">
          <div id="navSidebar-menu">
            <header>
              <Link to="/">
                <img className="App-logo" src={logo} alt="Hubbard Interactive"/>
              </Link>
            </header>
            <nav>
              <ul className="navigation">
                <li><NavLink to="/copy/">Copy</NavLink></li>
                <li><NavLink to="/contests/">Contests</NavLink></li>
                <li><NavLink to="/listeners/">Listeners</NavLink></li>
                <li><NavLink to="/frontdesk/">Front Desk</NavLink></li>
              </ul>
            </nav>
          </div>
      </div>

    );
  }
}

export default Nav;