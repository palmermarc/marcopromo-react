import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import '../assets/css/style.css';
import { Segment, Label, Message, Divider, Breadcrumb, Header, Form, Button, Input, Dropdown, Transition, Radio,  Select, TextArea } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';

class EditListener extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.getAge = this.getAge.bind(this);
    this.getListener = this.getListener.bind(this);
    this.createListener = this.createListener.bind(this);
    this.updateListener = this.updateListener.bind(this);
  }
  
  getInitialState() {
    return {
      loading: true,
      niceName: 'Create New Listener',
      visible: false,
      success: false,
      successMessage: '',
      errors: [],
      hasErrors: false,
      listenerId: 0,
      listener: {
        "first_name": '',
        "last_name": '',
        "address": '',
        "address2" : '',
        "city": '',
        "state": '',
        "zip": '',
        "primary_phone": '',
        "secondary_phone": '',
        "date_of_birth": '',
        "email": '',
        "notes": '',
      }
    }
  }

  componentWillMount() {
    // Call API
  }

  componentDidMount() {
    document.title = this.state.niceName;

    if( typeof this.props.match.params.listenerId !== "undefined" ) {

      let listenerId = this.props.match.params.listenerId;
      this.setState( { listenerId: listenerId } );

      this.getListener(listenerId);
    }
  }

  componentWillReceiveProps(nextProps) {
    document.title = this.state.niceName;
    this.setState(this.getInitialState());
  }

  handleChange(e) {
    const { name, value } = e.target;


    this.setState(
      prevState => ({
        listener: {
          ...prevState.listener,
          [name]: value
        }
    }));
    this.setState({unsaved: true});
  }

  getListener(listenerId) {
    if ( listenerId === 0 )
      return;
    let self = this;

    MarcoPromo.get(
      'listeners/' + listenerId,
      '',
      function(response) {
        let listener = response.data;

        self.setState({
          listener: {
            "first_name": listener.results.first_name,
            "last_name": listener.results.last_name,
            "address": listener.results.address,
            "address2": listener.results.address2,
            "city": listener.results.city,
            "state": listener.results.state,
            "zip": listener.results.zip,
            "primary_phone": listener.results.primary_phone,
            "secondary_phone": listener.results.secondary_phone,
            "date_of_birth": listener.results.date_of_birth,
            "email": listener.results.email,
            "notes": listener.results.notes,
          },
          "niceName" : "Update Listener"
        });
      },
      function(err) {
        self.setState({ errors: err.response.data.errors, hasErrors: true });
        console.log(err);
      }
    );
  }

  getAge(birthDateString) {
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  handleListenerSubmit = () => {
    console.log('test');
    // wipe out any errors/success
    this.setState({hasErrors: false, errors: [], success: false});

    let errors = [];

    // Handle Validation
    let listener = this.state.listener;

    if( listener.first_name == '' ) {
      errors.push("Listeners are required to have a first name.");
    }

    if( listener.last_name == '' ) {
      errors.push("Listeners are required to have a last name.");
    }

    if( listener.email == '' && listener.primary_phone == '' ) {
      errors.push("You must provide a phone number or email address before saving the listener");
    }

    if( listener.date_of_birth == '' ) {
      errors.push("A date of birth is required.");
    }

    if( 18 > this.getAge(listener.date_of_birth) ) {
      errors.push("Listeners must be 18 or older. Based on the date of birth provided, this listener is only " + this.getAge(listener.date_of_birth));
    }

    if( errors.length !== 0 ) {
      this.setState({ hasErrors: true, errors: errors });
    } else {
      if( this.state.listenerId == 0 ) {
        this.createListener(listener);
      } else {
        this.updateListener(listener);
      }
    }
  }

  createListener(data) {
    let self = this;
    console.log('trying to create a new listener');

    MarcoPromo.post(
      'listeners',
      data,
      function(response) {
        self.setState({
          success: true,
          successMessage: response.data.message
        });
      }
      ,function (err) {
        console.log(err);
        self.setState({ errors: err, hasErrors: true });
        MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
      }
    );
  }

  updateListener(data) {
    let self = this;
    MarcoPromo.put(
      'listeners/' + this.state.listenerId,
      data,
      function( response ) {
        self.setState({
          success: true,
          successMessage: response.data.message
        });
      }
      , function( err ) {
        console.log(err);
        self.setState({ errors: err.response.data.errors, hasErrors: true });
        MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
      }
    );
  }
  
  render() {
    let errors = this.state.errors;

    return (
      <div className="wrap fade-in">
        <div id="view-header-section">
          <Header as="h1" className="view-title">{this.state.niceName}</Header>
          <Divider hidden fitted />
          <Breadcrumb>
            <Breadcrumb.Section href={"/dashboard/"}>MarcoPromo</Breadcrumb.Section>
            <Breadcrumb.Divider/>
            <Breadcrumb.Section href={"/listeners/"}>Listeners</Breadcrumb.Section>
            <Breadcrumb.Divider/>
            <Breadcrumb.Section active>{this.state.niceName}</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div>
          <Form onSubmit={this.handleListenerSubmit}>
            <Form.Group inline>
              <Form.Field>
                <Input required value={this.state.listener.first_name} name="first_name" onChange={this.handleChange} placeholder="First Name" />
              </Form.Field>
              <Form.Field>
                <Input required value={this.state.listener.last_name} name="last_name" onChange={this.handleChange} placeholder="Last Name" />
              </Form.Field>
            </Form.Group>
            <Segment padded>
              <Label attached="top">Address</Label>
              <Form.Field>
                <Input value={this.state.listener.address} name="address" onChange={this.handleChange} placeholder="Address" />
              </Form.Field>
              <Form.Field>
                <Input value={this.state.listener.address2} name="address2" onChange={this.handleChange} placeholder="Address Line #2" />
              </Form.Field>
              <Form.Group inline>
                <Form.Field>
                  <Input value={this.state.listener.city} name="city" onChange={this.handleChange} placeholder="City" />
                </Form.Field>
                <Form.Field>
                  <Input value={this.state.listener.state} name="state" onChange={this.handleChange} placeholder="State" />
                </Form.Field>
                <Form.Field>
                  <Input value={this.state.listener.zip} name="zip" onChange={this.handleChange} placeholder="Zip" />
                </Form.Field>
              </Form.Group>
            </Segment>

            <Segment padded>
              <Label attached="top">Contact Details</Label>
              <Form.Group inline>
                <Form.Field>
                  <Input label="Email" labelPosition="left" value={this.state.listener.email} type="email" name="email" onChange={this.handleChange} placeholder="Email Address" />
                </Form.Field>
                <Form.Field>
                  <Input label="Date of Birth" labelPosition="left" value={this.state.listener.date_of_birth} name="date_of_birth" onChange={this.handleChange} placeholder="Date of Birth" type="date" />
                </Form.Field>
                <Form.Field>
                  <Input label="Primary Phone" labelPosition="left" value={this.state.listener.primary_phone} name="primary_phone" onChange={this.handleChange} placeholder="(314) 111-1111" />
                </Form.Field>
                <Form.Field>
                  <Input label="Secondary Home" labelPosition="left" value={this.state.listener.secondary_phone} name="secondary_phone" onChange={this.handleChange} placeholder="(314) 111-1111" />
                </Form.Field>
              </Form.Group>
            </Segment>

            {this.state.success &&
            <Message positive>
              <Message.Header>{this.state.successMessage}</Message.Header>
            </Message>
            }

            {this.state.hasErrors  && this.state.errors.length &&
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
)(EditListener));