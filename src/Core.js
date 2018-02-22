import React from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from './_actions/actions.authentication';

class Core extends React.Component {


  render() {
    console.log('Am I even being called?');
    return(
      <div>
        {this.props.children}
      </div>
    )
  }

}

Core.propTypes = {
  actions: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  children: PropTypes.element,
};


function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.username,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Core);
