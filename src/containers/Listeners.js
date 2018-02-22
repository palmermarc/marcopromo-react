import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import '../assets/css/tables.css';
import { Dimmer, Table, Loader, Button, Label, Dropdown, Input, Icon, Menu } from 'semantic-ui-react';
import MarcoPromo from '../core/MarcoPromo';
import { throttle } from '../utils/helpers';


class ListenersList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.jumpToPage = this.jumpToPage.bind(this);
    this.filterStatus = this.filterStatus.bind(this);
    this.filterMarket = this.filterMarket.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.setSearchObject = this.setSearchObject.bind(this);
    this.search = this.search.bind(this);
    this.timer = null;
  }

  getInitialState() {
    return {
      currentFilters: {},
      currentPage: 1,
      listeners: [],
      totalCount: 0,
      totalPages: 1,
      loading: true,
      niceName: 'Listeners',
      searchFields : [
        {key: 'first_name', text: 'First Name', value : 'first_name'},
        {key: 'last_name', text: 'Last Name', value : 'last_name'},
        {key: 'city', text: 'City', value : 'city'},
        {key: 'zip', text: 'Zip', value : 'zip'},
        {key: 'primary_phone', text: 'Phone Number', value : 'primary_phone'},
        {key: 'email', text: 'Email Address', value : 'email'},
      ],
      searchField: ''
    }
  }

  componentWillMount() {
    // Call API
    this.getListeners();
  }

  componentDidMount() {
    document.title =  'MarcoPromo | Listener List';
  }

  clearFilters() {
    this.setState(
      {
        currentFilters: []
      },
      this.getListeners
    );
  }

  prevPage() {
    this.setState(
      {
        currentFilters: [],
        currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1: this.state.currentPage
      },
      this.getListeners
    );
  }

  nextPage() {
    this.setState(
      {
        currentFilters: [],
        currentPage: this.state.currentPage < this.state.totalPages ? this.state.currentPage + 1: this.state.currentPage
      },
      this.getListeners
    );
  }

  jumpToPage(page) {
    this.setState(
      {
        currentPage: page,
        loading: true
      },
      this.getListeners
    );
  }

  setSearchObject(e, {value}) {
    this.setState({searchField: value});
  }

  filterStatus(e, {value}) {
    let currentFilters = Object.assign({}, this.state.currentFilters);

    if (value === 'any') {
      delete currentFilters['status'];

    } else {
      currentFilters['status'] = value;
    }

    this.setState({currentFilters: currentFilters}, this.getListeners);
  }

  filterMarket(e, {value}) {
    let currentFilters = Object.assign({}, this.state.currentFilters);

    if (value === 'any') {
      delete currentFilters['market'];

    } else {
      currentFilters['market'] = value;
    }

    this.setState({currentFilters: currentFilters}, this.getListeners);
  }

  filterSearch(value) {
    this.setState({currentFilters: {[this.state.searchField]: value}}, this.getListeners);
  }

  search(e) {
    e.persist();
    let filterSearch = this.filterSearch;
    this.timer = throttle( function() {
      filterSearch(e.target.value);
    }, 500, this.timer);
  }

  getListeners() {
    let self = this;
    MarcoPromo.get(
      'listeners',
      this.state.currentFilters,
      function(response) {
        if (response.data.success === true) {

          self.setState({
            listeners: response.data.results,
            totalCount: response.data.totalCount,
            totalPages: Math.ceil(response.data.totalCount / 100),
            loading: false
          });

        } else {
          MarcoPromo.error("Error getting listeners from MarcoPromo API server.");
        }
      }
      ,function (err) {
        MarcoPromo.error("Error getting listeners from MarcoPromo API server: " + err);
      }
    );
  }

  componentDidMount() {
    document.title =  'MarcoPromo / Listeners';

  }

  render() {
    console.log(this.state);
    let currentFilters = this.state.currentFilters;

    let {filterStatus, filterMarket, search} = this;

    if(this.state.loading)
      return (
        <Dimmer active inverted><Loader inverted content='Loading Member List' size="massive" /></Dimmer>
      )

    console.log(this.state);

    return (
      <div className="wrap fade-in">
        <div id="view-header-section">
          <h1 className="view-title">{this.state.niceName}</h1>
          <Button as={Link} to={'/listeners/create/'} className="view-create-new">
            <Icon name="plus" />
            Create New
          </Button>

          <div className="view-filters">
          </div>

          <div className="view-search">
            <Input icon='users' iconPosition='left' placeholder={"Search " + this.state.niceName  + '...'} onKeyUp={search} label={<Dropdown defaultValue='last_name' onChange={this.setSearchObject} options={this.state.searchFields} />} labelPosition={"right"} />
          </div>
        </div>

        <Table singleLine selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>State</Table.HeaderCell>
              <Table.HeaderCell>Zip</Table.HeaderCell>
              <Table.HeaderCell>Primary #</Table.HeaderCell>
              <Table.HeaderCell>Secondary #</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.state.listeners.map((listener) => (
            <Table.Row key={'listener-' + listener.ID}>
              <Table.Cell><Link to={'/listeners/edit/' + listener.ID + '/'}>{listener.first_name}</Link></Table.Cell>
              <Table.Cell><Link to={"/listeners/edit/" + listener.ID + "/"}>{listener.last_name}</Link></Table.Cell>
              <Table.Cell><Link to={"/listeners/edit/" + listener.ID + "/"}>{listener.city}</Link></Table.Cell>
              <Table.Cell><Link to={"/listeners/edit/" + listener.ID + "/"}>{listener.state}</Link></Table.Cell>
              <Table.Cell><Link to={"/listeners/edit/" + listener.ID + "/"}>{listener.zip}</Link></Table.Cell>
              <Table.Cell><Link to={"/listeners/edit/" + listener.ID + "/"}>{listener.primary_phone}</Link></Table.Cell>
              <Table.Cell><Link to={"/listeners/edit/" + listener.ID + "/"}>{listener.secondary_phone}</Link></Table.Cell>
              <Table.Cell><Link to={"/listeners/edit/" + listener.ID + "/"}>{listener.email}</Link></Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="8" className="view-pagination">
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListenersList));
