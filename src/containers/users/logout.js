import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from '../../_actions/actions.authentication';


class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    actions.userLogOut(true);
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
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage)