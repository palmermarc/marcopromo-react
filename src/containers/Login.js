import React from 'react';
import { Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from '../_actions/actions.authentication';
import '../assets/css/Login.css';
import logo from '../assets/images/logo.svg';
import { Message, Form, Button, Input } from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      submitted: false,
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true});
    const {username, password} = this.state;
    if (username && password) {
      this.props.actions.authenticateUser(username, password);
    }
  }

  render() {
    let user = this.props.user;

    return (
      <div className="login_form">
        <img className="App-logo" src={logo} alt="Hubbard Interactive"/>
        {user.loginHasErrors &&
        <Message error>{user.loginError}</Message>
        }

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="username" />
          </Form.Field>
          <Form.Field>
            <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="password" />
          </Form.Field>

          <Form.Field fluid control={Button}>Login</Form.Field>
        </Form>

        {user.isLoggedIn === true &&
          <Redirect push to="/" />
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