import React, { Component } from 'react';

var InputField = React.createClass({
  state: {
    {this.props.inputName}: ''
  },
  __onChange(e) {
    var stateChange = {};
    stateChange[e.target.name] = e.target.value;
    this.setState(stateChange);
  }
  render: function() {
    return(
      <input type={this.props.inputType} value={this.props.inputVal} name={this.props.inputName} />
    )
  }
});
