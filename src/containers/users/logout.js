import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogOut } from '../../_actions/actions.authentication';


class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
    sessionStorage.SessionName = "MarcoPromo";
    sessionStorage.clear();
  }

  componentDidMount() {
    this.props.logOut(true);
  }

  render() {
    return (
      <div className="logged_out">
        <h2>You have been logged out.</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (bool) => dispatch(userLogOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)