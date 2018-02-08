import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import '../assets/css/tables.css';
import PropTypes from 'prop-types';
import { Table, Loader, Button, Label, Dropdown, Input, Icon, Menu } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';
import {throttle, renderFieldValue, empty} from '../utils/helpers';


class CopiesList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.jumpToPage = this.jumpToPage.bind(this);
    this.filterStatus = this.filterStatus.bind(this);
    this.filterMarket = this.filterMarket.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.search = this.search.bind(this);
    this.timer = null;
  }

  getInitialState() {
    return {
      currentFilters: {},
      currentPage: 1,
      copies: [],
      totalCount: 0,
      totalPages: 1,
      loading: true,
      niceName: 'Copies'
    }
  }

  componentWillMount() {
    // Call API
    this.getRecords();
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

  clearFilters() {
    this.setState(
      {
        currentFilters: []
      },
      this.getRecords
    );
  }

  prevPage() {
    this.setState(
      {
        currentFilters: [],
        currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1: this.state.currentPage
      },
      this.getRecords
    );
  }

  nextPage() {
    this.setState(
      {
        currentFilters: [],
        currentPage: this.state.currentPage < this.state.totalPages ? this.state.currentPage + 1: this.state.currentPage
      },
      this.getRecords
    );
  }

  jumpToPage(page) {
    this.setState(
      {
        currentPage: page,
        loading: true
      },
      this.getRecords
    );
  }

  filterStatus(e, {value}) {
    let currentFilters = Object.assign({}, this.state.currentFilters);

    if (value === 'any') {
      delete currentFilters['status'];

    } else {
      currentFilters['status'] = value;
    }

    this.setState({currentFilters: currentFilters}, this.getRecords);
  }

  filterMarket(e, {value}) {
    let currentFilters = Object.assign({}, this.state.currentFilters);

    if (value === 'any') {
      delete currentFilters['market'];

    } else {
      currentFilters['market'] = value;
    }

    this.setState({currentFilters: currentFilters}, this.getRecords);
  }

  filterSearch(value) {
    this.setState({currentFilters: {"search": value}}, this.getRecords);
  }

  search(e) {
    e.persist();
    let filterSearch = this.filterSearch;
    this.timer = throttle( function() {
      filterSearch(e.target.value);
    }, 500, this.timer);
  }

  getRecords() {
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
    console.log(this.props);
    let currentFilters = this.state.currentFilters;

    let {filterStatus, filterMarket, search} = this;

    return (
      <div className="wrap fade-in">
        <div id="view-header-section">
          <h1 className="view-title">{this.state.niceName}</h1>
          <Button as={Link} to={'/copy/create'} className="view-create-new">
            <Icon name="plus" />
            Create New
          </Button>

          <div className="view-filters">

          </div>

          <div className="view-search">
            <Input placeholder={"Search " + this.state.niceName  + '...'} onKeyUp={search} />
          </div>
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
                <Link to={'/copy/edit/' + copy.ID + '/'}>{copy.name}</Link>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CopiesList));
