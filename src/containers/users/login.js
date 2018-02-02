import React from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { authenticateUserInfo } from '../../_actions/actions.authentication';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      submitted: false
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.authenticateUser('/users/authenticate', username, password);

    }

    if( sessionStorage.getItem('user') ) {
      console.log('user is logged in');
    }
  }

  render() {

    if (this.props.hasErrored) {
      return <p>Something went wrong</p>;
    }

    return (
      <div className="login_form">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (this.state.submitted && !this.state.username ? ' has-error' : '')}>
            <label htmlFor="username"><input size="35" required="true" type="text" className="form-control" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} /></label>

            {this.state.submitted && !this.state.username &&
            <div className="help-block">Username is required</div>
            }
          </div>
          <div className={'form-group' + (this.state.submitted && !this.state.password ? ' has-error' : '')}>
            <label htmlFor="password"><input size="35" required="true" type="password" className="form-control" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} /></label>
            {this.state.submitted && !this.state.password &&
            <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            {this.props.isLoggingIn &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
          </div>
        </form>
        {this.props.authSuccess && (
          <Redirect to="/dashboard/" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    hasErrored: state.authHasErrored,
    IsLoggingIn: state.authIsLoggingIn,
    authSuccess: state.authSuccess
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (url) => dispatch(authenticateUserInfo(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);