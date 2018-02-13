import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import '../assets/css/style.css';
import PropTypes from 'prop-types';
import { List, Message, Divider, Dropdown, Breadcrumb, Header, Form, Button, Transition, Radio, Input, Select, TextArea } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';
import config from '../constants/config';


class EditCopy extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleScheduleCopy = this.toggleScheduleCopy.bind(this);
    this.getStations = this.getStations.bind(this);
    this.getCopy = this.getCopy.bind(this);
  }

  getInitialState() {
    return {
      loading: true,
      niceName: 'Edit Copy',
      visible: false,
      name: '',
      unsaved: false,
      content: '',
      instructions: '',
      start_date: '',
      type: '',
      end_date: '',
      station_id: 0,
      success: false,
      errors: {},
      hasError: false,
      stations: [],
      copyTypes: [
        {key: 1,text:'Copy Type 1', value: 1},
        {key: 2,text:'Copy Type 2', value: 2},
        {key: 3,text:'Copy Type 3', value: 3},
        {key: 4,text:'Copy Type 4', value: 4},
      ],
      copyId: this.props.match.params.copyId,
      copySchedule: [
        {date: '', time: ''}
      ]
    }
  }

  componentWillMount() {
    // Call API
    this.getCopy(this.state.copyId);
    this.getStations();
  }

  componentDidMount() {
    document.title = this.state.niceName;
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.route.type !== this.props.route.type) {
      document.title = this.state.niceName;
      this.setState(this.getInitialState());
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name] : value });
    this.setState({unsaved: true});
  }

  handleSelectChange = (e, {name, value} ) => this.setState({[name]: value, unsaved: true})

  handleSubmit = () => {
    this.setState({ hasError: false, errors: {}, success: false });
    // Handle Validation

    // Send the data to the API
    let data = {
      name: this.state.name,
      content: this.state.content,
      instructions: this.state.instructions,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      type: this.state.type,
      station_id: this.state.station_id,
      schedule: this.state.copySchedule
    };

    MarcoPromo.put(
      'copies/' + this.state.copyId,
      data,
      function(response) {
        if (response.data.success === true) {
          console.log('It worked!');
          this.setState( { success: true, hasError: false, successMessage: response.data.message } );

        } else {
          this.setState({hasError: true, success: false});
          MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
        }
      }
      ,function (err) {
        //self.setState({ errors: err.response.data.errors, hasError: true });
        console.log(err);
        MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
      }
    );
  }

  getErrorArray(errors) {
    let err = [];
    Object.keys(errors).map((error) => {
      err.push(errors[error]);
    });
    return err;
  }

  toggleScheduleCopy() {
    this.setState({visible: !this.state.visible});
  }

  getCopy(ID) {
    let self = this;
    let copy = [];
    MarcoPromo.get(
      'copies/'+ID,
      {},
      function(response) {
        if( response.data.success === true ) {
          let copy = response.data.results;
          self.setState({
            name: copy.name,
            content: copy.content,
            instructions: copy.instructions,
            start_date: copy.start_date,
            end_date: copy.end_date,
            type: copy.type,
            station_id: copy.station.ID,
            schedule: copy.schedule
          });
        };
      }
    );
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
          Object.keys(stations).map((station) => {
            myStations.push({
              key: stations[station].ID,
              text: stations[station].name,
              value: stations[station].ID,
            });
          });
          self.setState({stations: myStations})
        }
      }
    );
  }

  handleCopyScheduleChange = (idx, myType) => (evt) => {
    const newCopySchedule = this.state.copySchedule.map((schedule, sidx) => {
      if (idx !== sidx) return schedule;
      return { ...schedule, [myType]: evt.target.value };
    });

    this.setState({ copySchedule: newCopySchedule });
  }

  handleAddCopySchedule = () => {
    this.setState({
      copySchedule: this.state.copySchedule.concat([{ name: '' }])
    });
  }

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      copySchedule: this.state.copySchedule.filter((s, sidx) => idx !== sidx)
    });
  }

  render() {
    const { visible } = this.state;
    let errors = this.state.errors;
    let error_keys = Object.keys(errors);
    console.log(this.state.copySchedule);
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
            <Breadcrumb.Section active>Edit Copy</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Input value={this.state.copyId} name="copyId" type="hidden" />
            </Form.Field>

            <Form.Field required onChange={this.handleChange} name="name" control={Input} label="Copy Title" value={this.state.name} placeholder="Enter the Copy Title" />
            <Form.Field value={this.state.content} required onChange={this.handleChange} name="content" control={TextArea} label="Copy Content" placeholder="Enter the Copy Content" />

            <Form.Field value={this.state.instructions} onChange={this.handleChange} name="instructions" control={TextArea} label="Copy Instructions" placeholder="Enter the Copy Instructions" />

            <Form.Group inline>
              <Form.Field>
                <Input required value={this.state.start_date} onChange={this.handleChange} name="start_date" label={{color: "green", tag: false, content: "Start Date"}} type="date" icon="calendar" iconPosition="left" labelPosition="right" />
                {error_keys.hasOwnProperty('start_date') &&
                <Message error content={errors.start_date}></Message>
                }
              </Form.Field>
              <Form.Field>
                <Input required value={this.state.end_date} onChange={this.handleChange} name="end_date" label={{color: "red", tag: false, content: "End Date"}} type="date" icon="calendar" iconPosition="left" labelPosition="right" />
              </Form.Field>
            </Form.Group>

            <Form.Group inline>
              <Form.Field>
                <Form.Dropdown selection required onChange={this.handleSelectChange} name="station_id" placeholder="Select a Station..." options={this.state.stations} value={this.state.station_id} />
              </Form.Field>

              <Form.Field>
                <Dropdown selection required onChange={this.handleSelectChange} name="type" placeholder="Select a Copy Type..." options={this.state.copyTypes} value={this.state.type} />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <Radio toggle onChange={this.toggleScheduleCopy} name="scheduling_copy" label="Schedule the copy" />
            </Form.Field>


            <Transition visible={visible} animation='fade' duration={500}>
              <div>
                {this.state.copySchedule.map((schedule, idx) => (
                  <div>
                    <Form.Group className={"repeatable_form_group"}inline>
                      <Form.Field onChange={this.handleCopyScheduleChange(idx, 'date')} control={Input} type="date" icon="calendar"/>
                      <Form.Field onChange={this.handleCopyScheduleChange(idx, 'time')} control={Input} type="time" icon="clock" />
                      <button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">-</button>
                    </Form.Group>
                  </div>
                ))}

                <Form.Field control={Button} onClick={this.handleAddCopySchedule} className="small">Add CopySchedule</Form.Field>
              </div>
            </Transition >

            {this.state.success &&
            <Message positive>
              <Message.Header>{this.state.successMessage}</Message.Header>
            </Message>
            }

            {this.state.hasError &&
            <Message negative>
              <Message.Header>Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.</Message.Header>
              <Message.List items={this.getErrorArray(errors)}></Message.List>
            </Message>
            }

            <Form.Field control={Button}>Edit Copy</Form.Field>
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
)(EditCopy));