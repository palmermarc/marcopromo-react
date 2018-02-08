import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../assets/css/tables.css';
import PropTypes from 'prop-types';
import { Table, Loader, Button, Label, Dropdown, Input, Icon, Menu } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';
import {throttle, renderFieldValue, empty} from '../utils/helpers';


class EditCopy extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      loading: true,
      niceName: 'Copies'
    }
  }

  componentWillMount() {
    // Call API
    this.getRecord();
  }

  componentDidMount() {
    document.title =  'MarcoPromo | Copy List';
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.route.type !== this.props.route.type) {
      document.title = 'MarcoPromo | Copy List';
      this.setState(this.getInitialState(), this.getRecords);
    }
  }

  getRecord() {
    let self = this;
    MarcoPromo.get(
      'copies',
      this.state.currentFilters,
      function(response) {
        if (response.data.success === true) {

          self.setState({
            copies: response.data.results,
            totalCount: response.data.totalCount,
            totalPages: Math.ceil(response.data.totalCount / 15),
            loading: false
          });

        } else {
          MarcoPromo.error("Error getting records from MarcoPromo API server.");
        }
      }
      ,function (err) {
        MarcoPromo.error("Error getting records from MarcoPromo API server: " + err);
      }
    );
  }

  componentDidMount() {
    document.title =  'MarcoPromo / Copies';

  }

  render() {
    return (
      <div className="wrap fade-in">
        <div id="view-header-section">
          <h1 className="view-title">{this.state.niceName}</h1>
        </div>

        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Station</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Copy Type</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.copies.map((copy) => (
              <Table.Row>
                <Table.Cell>
                  <Link to={'/copy/' + copy.ID}>{copy.name}</Link>
                </Table.Cell>
                <Table.Cell>{copy.station.name}</Table.Cell>
                <Table.Cell>{copy.state_date}</Table.Cell>
                <Table.Cell>{copy.end_date}</Table.Cell>
                <Table.Cell>{copy.type}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCopy);
