import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import '../assets/css/style.css';
import PropTypes from 'prop-types';
import { List, Message, Divider, Dropdown, Breadcrumb, Header, Form, Button, Transition, Radio, Input, Select, TextArea } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';
import config from '../constants/config';


class CreateCopy extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleScheduleCopy = this.toggleScheduleCopy.bind(this);
    this.getStations = this.getStations.bind(this);
  }

  getInitialState() {
    return {
      loading: true,
      niceName: 'Create New Copy',
      visible: false,
      name: '',
      unsaved: false,
      content: '',
      instructions: '',
      start_date: '',
      end_date: '',
      success: false,
      errors: {},
      hasError: false,
      stations: [],
      copyType: [
        {key: 1,text:'Copy Type 1', value: 1},
        {key: 2,text:'Copy Type 2', value: 2},
        {key: 3,text:'Copy Type 3', value: 3},
        {key: 4,text:'Copy Type 4', value: 4},
      ]
    }
  }

  componentWillMount() {
    // Call API
  }

  componentDidMount() {
    document.title = this.state.niceName;

    this.getStations();
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.route.type !== this.props.route.type) {
      document.title = this.state.niceName;
      this.setState(this.getInitialState(), this.getRecords);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name] : value });
    this.setState({unsaved: true});
  }

  handleSubmit(e) {
    // wipe out any errors/success
    this.setState({hasError: false, errors: {}, success: false});
    // Handle Validation

    // Send the data to the API
    let data = {
      name: this.state.name,
      content: this.state.content,
      instructions: this.state.instructions,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      type: this.state.copy_type,
      station_id: this.state.station_id,
    }

    this.submitCopy(data);
  }

  handleSelectChange = (e, {name, value} ) => this.setState({[name]: value, unsaved: true})

  getErrorArray(errors) {
    let err = [];
    Object.keys(errors).map((error) => {
      err.push(errors[error]);
    });
    return err;
  }

  submitCopy(data) {
    let self = this;
    MarcoPromo.post(
      'copies',
      data,
      function(response) {
        console.log(response);
        if (response.data.success === true) {

          self.setState({
            success: true
          });

        } else {
          self.setState({hasError: true});
          MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
        }
      }
      ,function (err) {
        console.log(err.response.data.errors);
        self.setState({ errors: err.response.data.errors, hasError: true });
        MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
      }
    );
  }

  toggleScheduleCopy() {
    this.setState({visible: !this.state.visible});
  }

  getStations() {
    let self = this;
    let myStations = [];
    MarcoPromo.get(
      'stations',
      {},
      function(response) {
        if( response.data.success === true ) {
          let stations = response.data.results;
          let total = 0;
          Object.keys(stations).map((station) => {
            myStations.push({
              key: stations[station].ID,
              text: stations[station].name,
              value: stations[station].ID,
            });
          });
          console.log(myStations);
          self.setState({stations: myStations})
        }
      }
    );
  }

  render() {
    const { visible } = this.state;
    let errors = this.state.errors;
    let error_keys = Object.keys(errors);
    console.log(this.state);
    return (
      <div className="wrap fade-in">
        <div id="view-header-section">
          <Header as="h1" className="view-title">{this.state.niceName}</Header>
          <Divider hidden fitted />
          <Breadcrumb>
            <Breadcrumb.Section href={"/dashboard/"}>MarcoPromo</Breadcrumb.Section>
            <Breadcrumb.Divider/>
            <Breadcrumb.Section href={"/copy/"}>Copy</Breadcrumb.Section>
            <Breadcrumb.Divider/>
            <Breadcrumb.Section active>Add New Copy</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field required onChange={this.handleChange} name="name" control={Input} label="Copy Title" value={this.state.title} placeholder="Enter the Copy Title" />
              <Form.Field required onChange={this.handleChange} name="content" control={TextArea} label="Copy Content" placeholder="Enter the Copy Content" />

              <Form.Field onChange={this.handleChange} name="instructions" control={TextArea} label="Copy Instructions" placeholder="Enter the Copy Instructions" />

              <Form.Group inline>
                <Form.Field>
                  <Input required onChange={this.handleChange} name="start_date" label={{color: "green", tag: false, content: "Start Date"}} type="date" icon="calendar" iconPosition="left" labelPosition="right" />
                  {error_keys.hasOwnProperty('start_date') &&
                  <Message error content={errors.start_date}></Message>
                  }
                </Form.Field>
                <Form.Field>
                  <Input required onChange={this.handleChange} name="end_date" label={{color: "red", tag: false, content: "End Date"}} type="date" icon="calendar" iconPosition="left" labelPosition="right" />
                </Form.Field>
              </Form.Group>

              <Form.Group inline>
                <Form.Field>
                  <Dropdown selection required onChange={this.handleSelectChange} name="station_id" placeholder="Select a Station..." options={this.state.stations} value={this.state.station_id} />
                </Form.Field>

                <Form.Field>
                  <Dropdown selection required onChange={this.handleSelectChange} name="copy_type" placeholder="Select a Copy Type..." options={this.state.copyType} value={this.state.copy_type} />
                </Form.Field>
              </Form.Group>

              <Form.Field>
                <Radio toggle onChange={this.toggleScheduleCopy} name="scheduling_copy" label="Schedule the copy" />
              </Form.Field>


              <Transition visible={visible} animation='fade' duration={500}>
                <div>
                  <Form.Group inline>
                    <Form.Field control={Input} name="schedule[][date]" type="date" icon="calendar" />
                    <Form.Field control={Input} name="schedule[][time]" type="time" icon="clock" />
                  </Form.Group>
                </div>
              </Transition >
              {this.state.success &&
              <Message positive>
                <Message.Header>Copy has been successfully created!</Message.Header>
              </Message>
              }

              {this.state.hasError &&
              <Message negative>
                <Message.Header>Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.</Message.Header>
                <Message.List items={this.getErrorArray(errors)}></Message.List>
              </Message>
              }

              <Form.Field control={Button}>Create Copy</Form.Field>
            </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCopy));
