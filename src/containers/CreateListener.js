import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import '../assets/css/style.css';
import { Segment, Label, Message, Divider, Dropdown, Breadcrumb, Header, Form, Button, Transition, Radio, Input, Select, TextArea } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';
import config from '../constants/config';


class EditCopy extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  getInitialState() {
    return {
      loading: true,
      niceName: 'Create New Listener',
      visible: false,
      success: false,
      successMessage: '',
      errors: {},
      hasError: false,
      listener: {
        "first_name": '',
        "last_name": '',
        "city": '',
        "state": '',
        "zip": '',
        "primary_phone": '',
        "secondary_phone": '',
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
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.route.type !== this.props.route.type) {
      document.title = this.state.niceName;
      this.setState(this.getInitialState());
    }
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

    this.submitListener(data);
  }

  getErrorArray(errors) {
    let err = [];
    Object.keys(errors).map((error) => {
      err.push(errors[error]);
    });
    return err;
  }

  submitListener(data) {
    let self = this;

    let listener = this.state.listener;

    this.setState({
      hasError: true,
      errors: {
        "primary_phone" : "You must provide a phone number or email address before saving the listener",
      }
    });

    return;

    MarcoPromo.post(
      'copies',
      data,
      function(response) {
        if (response.data.success === true) {

          self.setState({
            success: true,
            successMessage: response.data.message
          });

        } else {
          self.setState({hasError: true});
          MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
        }
      }
      ,function (err) {
        self.setState({ errors: err.response.data.errors, hasError: true });
        MarcoPromo.error("Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.");
      }
    );
  }
  
  render() {
    const { visible } = this.state;
    let errors = this.state.errors;
    console.log(this.state);

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
            <Breadcrumb.Section active>Add New Listener</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit}>
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
              <Form.Field>
                <Input value={this.state.listener.email} type="email" name="email" onChange={this.handleChange} placeholder="Email Address" />
              </Form.Field>
              <Form.Field>
                <Input value={this.state.listener.primary_phone} name="primary_phone" onChange={this.handleChange} placeholder="primary_phone" />
              </Form.Field>
              <Form.Field>
                <Input value={this.state.listener.secondary_phone} name="secondary_phone" onChange={this.handleChange} placeholder="secondary_phone" />
              </Form.Field>
            </Segment>

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

            <Form.Field control={Button}>Add Listener</Form.Field>
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