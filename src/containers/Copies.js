import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import '../assets/css/tables.css';
import { Menu,Dimmer, Loader, Table, Button, Input, Icon } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';
import {throttle} from '../utils/helpers';


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
    this.getCopies();
  }

  componentDidMount() {
    document.title =  'MarcoPromo | Copy List';
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getInitialState(), this.getCopies);
  }

  clearFilters() {
    this.setState(
      {
        currentFilters: []
      },
      this.getCopies
    );
  }

  prevPage() {
    this.setState(
      {
        currentFilters: { "page" : this.state.currentPage > 1 ? this.state.currentPage - 1: this.state.currentPage },
        currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1: this.state.currentPage
      },
      this.getCopies
    );
  }

  nextPage() {
    this.setState(
      {
        currentFilters: { "page": this.state.currentPage < this.state.totalPages ? this.state.currentPage + 1: this.state.currentPage},
        currentPage: this.state.currentPage < this.state.totalPages ? this.state.currentPage + 1: this.state.currentPage
      },
      this.getCopies
    );
  }

  jumpToPage(page) {
    this.setState(
      {
        currentPage: page,
        currentFilters: { "page": page },
        loading: true
      },
      this.getCopies
    );
  }

  filterStatus(e, {value}) {
    let currentFilters = Object.assign({}, this.state.currentFilters);

    if (value === 'any') {
      delete currentFilters['status'];

    } else {
      currentFilters['status'] = value;
    }

    this.setState({currentFilters: currentFilters}, this.getCopies);
  }

  filterMarket(e, {value}) {
    let currentFilters = Object.assign({}, this.state.currentFilters);

    if (value === 'any') {
      delete currentFilters['market'];

    } else {
      currentFilters['market'] = value;
    }

    this.setState({currentFilters: currentFilters}, this.getCopies);
  }

  filterSearch(value) {
    this.setState({currentFilters: {"search": value}}, this.getCopies);
  }

  search(e) {
    e.persist();
    let filterSearch = this.filterSearch;
    this.timer = throttle( function() {
      filterSearch(e.target.value);
    }, 500, this.timer);
  }

  getCopies() {
    let self = this;
    MarcoPromo.get(
      'copies',
      this.state.currentFilters,
      function(response) {
        if (response.data.success === true) {

          self.setState({
            copies: response.data.results,
            totalCount: response.data.totalCount,
            totalPages: Math.ceil(response.data.totalCount / 100),
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

  render() {
    let currentFilters = this.state.currentFilters;

    let {filterStatus, filterMarket, search} = this;

    if(this.state.loading)
      return (
        <Dimmer active inverted><Loader inverted content='Loading Copies' size="massive" /></Dimmer>
      )

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
            <Table.Row key={'copy-'+copy.ID}>
              <Table.Cell>
                <Link to={'/copy/edit/' + copy.ID + '/'}>{copy.name}</Link>
                </Table.Cell>
              <Table.Cell>{copy.station.name}</Table.Cell>
              <Table.Cell>{copy.start_date}</Table.Cell>
              <Table.Cell>{copy.end_date}</Table.Cell>
              <Table.Cell>{copy.type}</Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6" className="view-pagination">
                <Menu pagination>

                  { this.state.currentPage > 1 ?
                    <Menu.Item icon onClick={this.prevPage}>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    :
                    <Menu.Item icon disabled>
                      <Icon name="chevron left" />
                    </Menu.Item>
                  }

                  { this.state.currentPage > 3 ?
                    <Menu.Item name ="1" onClick={() => this.jumpToPage(1)}/>
                    :
                    null
                  }

                  { this.state.currentPage > 4 ?
                    <Menu.Item disabled>...</Menu.Item>
                    :
                    null
                  }

                  { this.state.currentPage > 2 ?
                    <Menu.Item name={String(this.state.currentPage - 2)} onClick={() => this.jumpToPage(this.state.currentPage - 2)}/>
                    :
                    null
                  }

                  { this.state.currentPage > 1 ?
                    <Menu.Item name={String(this.state.currentPage - 1)} onClick={() => this.jumpToPage(this.state.currentPage - 1)}/>
                    :
                    null
                  }

                  <Menu.Item name={String(this.state.currentPage)} active={true} onClick={() => this.jumpToPage(this.state.currentPage)} />

                  { this.state.currentPage < this.state.totalPages - 1 ?
                    <Menu.Item name={String(this.state.currentPage + 1)} onClick={() => this.jumpToPage(this.state.currentPage + 1)}/>
                    :
                    null
                  }

                  { this.state.currentPage < this.state.totalPages - 2 ?
                    <Menu.Item name={String(this.state.currentPage + 2)} onClick={() => this.jumpToPage(this.state.currentPage + 2)}/>
                    :
                    null
                  }

                  { this.state.currentPage <= 2 && this.state.currentPage < this.state.totalPages -  3 ?
                    <Menu.Item name={String(this.state.currentPage + 3)} onClick={() => this.jumpToPage(this.state.currentPage + 3)}/>
                    :
                    null
                  }

                  { this.state.currentPage <= 1 && this.state.currentPage < this.state.totalPages -  4 ?
                    <Menu.Item name={String(this.state.currentPage + 4)} onClick={() => this.jumpToPage(this.state.currentPage + 4)}/>
                    :
                    null
                  }

                  { this.state.currentPage < this.state.totalPages - 4 ?
                    <Menu.Item disabled>...</Menu.Item>
                    :
                    null
                  }


                  { this.state.currentPage < this.state.totalPages - 3 ?
                    <Menu.Item name={String(this.state.totalPages)} onClick={() => this.jumpToPage(this.state.totalPages)}/>
                    :
                    null
                  }

                  { this.state.currentPage !== this.state.totalPages?
                    <Menu.Item icon onClick={this.nextPage}>
                      <Icon name="chevron right" />
                    </Menu.Item>
                    :
                    <Menu.Item icon disabled>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  }

                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CopiesList));
