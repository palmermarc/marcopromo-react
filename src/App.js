import React from 'react';
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Nav from './containers/Nav';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './containers/Login';
import CopiesList from './containers/Copies';
import EditCopy from './containers/EditCopy';
import ListenersList from './containers/Listeners';
import EditListener from './containers/EditListener';
import EditContest from './containers/EditContest';

import LogoutPage from './containers/users/logout';
import {withRouter} from "react-router";
import * as actions from "./_actions/actions.authentication";
import {bindActionCreators} from "redux/index";

const history = createBrowserHistory();

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
  }



  render() {
    return (
      <div className={"marcopromo-app-container " + ( this.props.user.isLoggedIn ? "user-logged-in" : "user-not-logged-in" ) }>
        <Router history={history}>
          <div>
              <div id="" className="content">
                <Nav></Nav>
                <div id="content_bin">
                  <Route exact path="/" component={CopiesList} />
                  <Route exact path="/copy/" niceName="Copies" component={CopiesList} />
                  <Route exact path="/copy/create" component={EditCopy} />
                  <Route exact path="/copy/edit/:copyId/" component={EditCopy} />
                  <Route exact path="/user/logout/" component={LogoutPage} />
                  <Route exact path="/login/" component={Login} />
                  <Route exact path="/listeners/" component={ListenersList} />
                  <Route exact path="/listeners/create/" component={EditListener} />
                  <Route exact path="/listeners/edit/:listenerId/" component={EditListener} />
                  <Route exact path="/contests/create/" component={EditContest} />
                </div>
              </div>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));