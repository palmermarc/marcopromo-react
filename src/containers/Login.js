import React from 'react';
import { Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from '../_actions/actions.authentication';

class Login extends React.Component {
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
    console.log('Made it this far');
    this.setState({submitted: true});
    const {username, password} = this.state;
    if (username && password) {
      this.props.actions.authenticateUser(username, password);
    }
    console.log(this.props);
  }

  render() {

    return (
      <div className="login_form">
        <h2>Login</h2>
        {this.props.hasErrored &&
        <h3 className="error">Invalid username or password</h3>
        }
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (this.state.submitted && !this.state.username ? ' has-error' : '')}>
            <label htmlFor="username"><input size="35" required="true" type="text" className="form-control" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} /></label>

            {this.state.submitted && !this.state.username &&
            <div className="help-block">Username is required</div>
            }
          </div>
          <div className={'form-group' + (this.state.submitted && !this.state.password ? ' has-error' : '')}>
            <label htmlFor="password"><input size="35" required="true" type="text" className="form-control" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} /></label>
            {this.state.submitted && !this.state.password &&
            <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        {this.props.user.userId &&
        <Redirect to="/dashboard/" />
        }
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);