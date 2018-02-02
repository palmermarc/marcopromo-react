import React from 'react';
import { Link } from 'react-router-dom'

class Nav extends React.Component {

  render() {
    return (
      <nav>
        <div className="container_bin">
          <ul className="navigation">
            <li><Link to="/copy/">Copy</Link></li>
            <li><Link to="/contests/">Contests</Link></li>
            <li><Link to="/listeners/">Listeners</Link></li>
            <li><Link to="frontdesk/">Front Desk</Link></li>
          </ul>
          <ul className="account-info">
            <li>
              Hello <span></span>
              <ul>
                <li><Link to="/users/edit-profile/">Edit Profile</Link></li>
                <li><Link to="/users/logout/">Log Out</Link></li>
              </ul>
            </li>

          </ul>
          <div className="clear"></div>
        </div>
      </nav>
    );
  }
}

export default Nav;