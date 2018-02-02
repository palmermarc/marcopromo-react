import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import axios from 'axios';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.state);
  }

  handleChange = (e) =>{
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
  }

  handleLogin(event) {
    event.preventDefault();

    const { username, password } = this.state;

    let self = this;

    let formData = {
      username: this.state.username,
      password: this.state.pwd
    };

    axios({
      method: 'post',
      url: 'http://marcopromo.api/users/login/',
      data: formData
    }).then(function(response) {
      if( response.data.success ) {

        sessionStorage.SessionName = "MarcoPromo";
        sessionStorage.setItem( 'token', response.data.token );
        self.setState({ redirect:true });
      } else {
        self.setState({
          isLoggedIn : false,
          errorMessage : "Error: " + response.data.message
        });
      }

    });
  }

  render() {

    return (
      <div>
        <h1>Edit Profile</h1>
      </div>
    );
  }
}

export default EditProfile;

