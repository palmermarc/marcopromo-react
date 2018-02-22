import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import '../assets/css/style.css';
import { Message, Divider, Dropdown, Breadcrumb, Header, Form, Button, Input, Segment, Label, Icon } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';
import config from '../constants/config';

class EditContest extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePrizeChange = this.handlePrizeChange.bind(this);
    this.handleCreateNewPrize = this.handleCreateNewPrize.bind(this);
    this.handlePrizeSelection = this.handlePrizeSelection.bind(this);
  }

  getInitialState() {
    return {
      loading: true,
      niceName: 'Create New Contest',
      visible: false,
      unsaved: false,
      success: false,
      successMessage: '',
      errors: {},
      hasError: false,
      stations: [],
      copy: {},
      contest: {
        "name": "",
        "contestUrl": "",
        "rulesUrl": "",
        "contestCopy" : [],
        "stations": [],
      },
      prizes: [{
        "name": "",
        "value": 0,
        "isPrizeInHouse": '',
        "listenerPickup": '',
        "ignore30DayRule": '',
        "minimumWinnerAge": '',
      }]
    }
  }

  componentWillMount() {
    // Call API
    //this.getCopy(this.state.copyId);
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
        contest: {
          ...prevState.contest,
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

    this.submitCopy(data);
  }

  handleSelectChange = (e, {name, value} ) => this.setState({[name]: value, unsaved: true})

  handlePrizeChange = (idx, myType ) => (evt) => {
    const newPrizeList = this.state.prizes.map((prize, sidx) => {
      if (idx !== sidx) return prize;
      return { ...prize, [myType]: evt.target.value };
    });

    this.setState({ prizes: newPrizeList, unsaved: true });
  }

  handlePrizeSelection = (idx, name, e, value) => {
    console.log(idx + " | " + name + " | " + value.value);
    const newPrizeList = this.state.prizes.map((prize, sidx) => {

      if (idx !== sidx) return prize;
      return {...prize, [name]: value.value};
    });
    console.log(newPrizeList);
    this.setState({prizes: newPrizeList, unsaved: true});

  }

  handleCreateNewPrize = () => {
    this.setState({
      prizes: this.state.prizes.concat([{ name: '' }]), unsaved: true
    });
  }

  handlePrizeRemoval = (idx) => () => {
    this.setState({
      prizes: this.state.prizes.filter((s, sidx) => idx !== sidx), unsaved: true
    });
  }

  submitCopy(data) {
    let self = this;
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
    let contest = this.state.contest;

    console.log(this.state.prizes);

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
            <Breadcrumb.Section active>Create Copy</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field required onChange={this.handleChange} name="name" control={Input} label="Contest Name" value={contest.name} placeholder="Enter the Contest Name" />

            <Form.Field>
              <label>Contest URL</label>
              <Input type="url" name="contestUrl" value={contest.contestUrl} onChange={this.handleChange} />
            </Form.Field>

            <Form.Field>
              <label>Contest Rules</label>
              <Input type="url" name="rulesUrl" value={contest.rulesUrl} onChange={this.handleChange} />
            </Form.Field>

            <Segment padded>
              <Label attached="top">Prizes</Label>
                <Button color="green" onClick={this.handleCreateNewPrize} className="small"><Icon name={"gift"} fitted /> Add Another Prize</Button>
                {this.state.prizes.map((prize, idx) => (
                  <Segment raised key={"prize-"+idx}>
                    {console.log(prize.ignore30DayRule)}
                    <Form.Field>
                      <Input onChange={this.handlePrizeChange(idx, 'name')} type="text" value={prize.name} label="Prize Name" labelPosition="left" />
                    </Form.Field>
                    <Form.Field>
                      <Input size="tiny" onChange={this.handlePrizeChange(idx, 'value')} type="text" value={prize.value} label="Prize Value" labelPosition="left" />
                    </Form.Field>
                    <Form.Field>
                      <Dropdown selection onChange={(e, val) => this.handlePrizeSelection(idx, 'isPrizeInHouse', e, val)} name="isPrizeInHouse" placeholder="Is the prize at the studio?" options={config.dropdowns.prizes.isPrizeInHouse} value={prize.isPrizeInHouse} />
                    </Form.Field>
                    <Form.Field>
                      <Dropdown selection onChange={(e, val) => this.handlePrizeSelection(idx, 'listenerPickup', e, val)} name="listenerPickup" placeholder="How will the listener prick up their prize?" options={config.dropdowns.prizes.listenerPickup} value={prize.listenerPickup} />
                    </Form.Field>

                    <Form.Field>
                      <Dropdown selection onChange={(e, val) => this.handlePrizeSelection(idx, 'ignore30DayRule', e, val)} name="ignore30DayRule"  placeholder="Does this prize ignore the 30-day rule?" options={config.dropdowns.prizes.ignore30DayRule} value={prize.ignore30DayRule} />
                    </Form.Field>
                    <Form.Field>
                      <Input onChange={this.handlePrizeChange(idx, 'minimumWinnerAge')} type="text" value={prize.minimumWinnerAge} label="Minimum Winner Age" labelPosition="left" />
                    </Form.Field>

                    <Button type="button" onClick={this.handlePrizeRemoval(idx)} color="red" className="small">Remove Prize</Button>
                  </Segment>
                ))}
            </Segment>

            {this.state.success &&
            <Message positive>
              <Message.Header>Copy has been successfully created!</Message.Header>
            </Message>
            }

            {this.state.hasError &&
            <Message negative>
              <Message.Header>Error saving copy to MarcoPromo API server. Please check your data to make sure all fields are filled out.</Message.Header>
              <Message.List items={errors}></Message.List>
            </Message>
            }

            <Form.Field control={Button}>Save Contest Information</Form.Field>
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
)(EditContest));