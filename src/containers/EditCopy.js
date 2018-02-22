import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import '../assets/css/style.css';
import { Icon, Loader, Dimmer, Message, Divider, Dropdown, Breadcrumb, Header, Form, Button, Transition, Radio, Input, TextArea } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';

class EditCopy extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCopyChange = this.handleCopyChange.bind(this);
    this.toggleScheduleCopy = this.toggleScheduleCopy.bind(this);
    this.getStations = this.getStations.bind(this);
    this.getCopy = this.getCopy.bind(this);

    this.updateCopy = this.updateCopy.bind(this);
    this.createCopy = this.createCopy.bind(this);
  }

  getInitialState() {
    return {
      loading: true,
      niceName: 'Create New Copy',
      visible: false,
      name: '',
      unsaved: false,
      success: false,
      successMessage: '',
      errors: {},
      hasError: false,
      stations: [],
      copyTypes: [
        {key: 1,text:'Copy Type 1', value: 1},
        {key: 2,text:'Copy Type 2', value: 2},
        {key: 3,text:'Copy Type 3', value: 3},
        {key: 4,text:'Copy Type 4', value: 4},
      ],
      copy : {
        name : '',
        content : '',
        instructions : '',
        start_date : '',
        end_date : '',
        type : '',
        station_id : 0,
        schedule : [{
          date: '',
          time: '',
        }],
      },
      copyId: 0,
    }
  }

  componentWillMount() {
    // Call API
    if( this.state.copyId !== 0 )
      this.getCopy(this.state.copyId);

    this.getStations();
  }

  componentDidMount() {
    document.title = this.state.niceName;
    if( typeof this.props.match.params.copyId !== "undefined" ) {
      this.getCopy(this.props.match.params.copyId);
      this.setState({ copyId: this.props.match.params.copyId, niceName: "Update Copy" });
    }
    this.setState({loading: false});
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.route.type !== this.props.route.type) {
      document.title = this.state.niceName;
      this.setState(this.getInitialState());
    }
  }

  handleCopyChange(e) {
    const { name, value } = e.target;
    
    this.setState(
      prevState => ({
        copy: {
          ...prevState.copy,
          [name]: value
        },
        unsaved: true
      }));
  }

  handleSelectChange = (e, {name, value} ) => this.setState({[name]: value, unsaved: true})

  handleSubmit = () => {
    this.setState({ hasError: false, errors: {}, success: false });
    // Handle Validation

    let copy = this.state.copy;

    // Send the data to the API
    let data = {
      name: copy.name,
      content: copy.content,
      instructions: copy.instructions,
      start_date: copy.start_date,
      end_date: copy.end_date,
      type: copy.type,
      station_id: copy.station_id,
      schedule: copy.copySchedule
    };

    if( this.state.copyId !== 0 ) {
      this.updateCopy(data);
    } else {
      this.createCopy(data);
    }
  }

  updateCopy(data) {

    let self = this;

    MarcoPromo.put(
      'copies/' + this.state.copyId,
      data,
      function(response) {
        self.setState( { success: true, hasError: false, successMessage: response.data.message } );
      }
      ,function (err) {
        self.setState({ errors: err.response.data.errors, hasError: true });
        MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
      }
    );
  }

  createCopy(data) {
    let self = this;
    MarcoPromo.post(
      'copies',
      data,
      function(response) {
        self.setState({
          success: true,
          successMessage: response.data.message
        });
      }
      ,function (err) {
        self.setState({ errors: err.response.data.errors, hasError: true });
        console.log('---------------------------');
        console.log(err.response.data.errors);
        console.log('---------------------------');
        //MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
      }
    );
  }

  toggleScheduleCopy() {
    this.setState({visible: !this.state.visible});
  }

  getCopy(ID) {
    let self = this;
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
            copySchedule: copy.schedules,
            loading: false
          });

          if(copy.schedules.length) {
            self.setState({ visible: true });
          }
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

    if(this.state.loading)
      return (
        <Dimmer active inverted><Loader inverted content='Loading Copy Data' size="massive" /></Dimmer>
      )

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

            <Form.Field required onChange={this.handleCopyChange} name="name" control={Input} label="Copy Title" value={this.state.copy.name} placeholder="Enter the Copy Title" />
            <Form.Field value={this.state.copy.content} required onChange={this.handleCopyChange} name="content" control={TextArea} label="Copy Content" placeholder="Enter the Copy Content" />

            <Form.Field value={this.state.copy.instructions} onChange={this.handleCopyChange} name="instructions" control={TextArea} label="Copy Instructions" placeholder="Enter the Copy Instructions" />

            <Form.Group inline>
              <Form.Field>
                <Input required value={this.state.copy.start_date} onChange={this.handleCopyChange} name="start_date" label={{color: "green", tag: false, content: "Start Date"}} type="date" icon="calendar" iconPosition="left" labelPosition="right" />
                {error_keys.hasOwnProperty('start_date') &&
                <Message error content={errors.start_date}></Message>
                }
              </Form.Field>
              <Form.Field>
                <Input required value={this.state.copy.end_date} onChange={this.handleCopyChange} name="end_date" label={{color: "red", tag: false, content: "End Date"}} type="date" icon="calendar" iconPosition="left" labelPosition="right" />
              </Form.Field>
            </Form.Group>

            <Form.Group inline>
              <Form.Field>
                <Form.Dropdown selection required onChange={this.handleSelectChange} name="station_id" placeholder="Select a Station..." options={this.state.stations} value={this.state.copy.station_id} />
              </Form.Field>

              <Form.Field>
                <Dropdown selection required onChange={this.handleSelectChange} name="type" placeholder="Select a Copy Type..." options={this.state.copyTypes} value={this.state.copy.type} />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              {visible === true ?
                <Radio defaultChecked toggle onChange={this.toggleScheduleCopy} label="Schedule the copy"  />
              :
                <Radio toggle onChange={this.toggleScheduleCopy} label="Schedule the copy" />
              }
            </Form.Field>


            <Transition visible={visible} animation='fade' duration={500}>
              <div>
                {this.state.copy.schedule.map((schedule, idx) => (
                  <div key={"schedule-"+idx}>
                    <Form.Group className={"repeatable_form_group"}inline>
                      <Form.Field onChange={this.handleCopyScheduleChange(idx, 'date')} control={Input} type="date" icon="calendar" value={schedule.date} />
                      <Form.Field onChange={this.handleCopyScheduleChange(idx, 'time')} control={Input} type="time" icon="clock" value={schedule.time} />
                      <button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">-</button>
                    </Form.Group>
                  </div>
                ))}

                <Form.Field control={Button} onClick={this.handleAddCopySchedule} className="small"><Icon name={"plus"} /> Add Another Schedule</Form.Field>
              </div>
            </Transition >

            {this.state.success === true &&
            <Message positive>
              <Message.Header>{this.state.successMessage}</Message.Header>
            </Message>
            }

            {errors.length &&
            <Message negative>
              <Message.Header>Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.</Message.Header>
              <Message.List items={errors}></Message.List>
            </Message>
            }

            <Form.Field control={Button}>{this.state.niceName}</Form.Field>
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