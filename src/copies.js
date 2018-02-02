import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './assets/css/tables.css';


import { copiesFetchData } from './_actions/actions.copies';

class CopiesList extends React.Component {

  componentDidMount() {
    this.props.copiesFetchData('http://marcopromo.api/copies');
  }

  render() {
    if (this.props.copiesHasErrored) {
      return <p>Sorry! There was an error loading the copies. If this problem persists, please notify the digital team.</p>;
    }
    if (this.props.copiesIsLoading) {
      return <p>Loading copies, please hold…</p>;
    }
    let copies = this.props.copies;

    return (
      <div className="wrap">
        <h1 className="page-title">Copies</h1>
        <Link className="page-title-action" to="/copy/add">Add New Copy</Link>
        <div className="list-filters">
          <select className="item-filter" name="filter-stations">
            <option value="">Select a station</option>
          </select>
          <select className="item-filter" name="filter-stations">
            <option value="">Select an event type</option>
          </select>
        </div>
        <table className="item-list striped">
          <thead>
            <tr>
              <th id="cb" class="manage-column column-cb check-column"><label className="screen-reader-text" htmlFor="cb-select-all-1">Select All</label><input id="cb-select-all-1" type="checkbox" /></th>
              <th>Title</th>
              <th>Copy Station</th>
              <th>Copy Type</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(this.props.copies).map((key) => (
            <tr>
              <td><input id="cb-select-50059" type="checkbox" name="copy[]" value={copies[key].ID} /></td>
              <td><Link to={"/copy/"+copies[key].ID+"/"}>{copies[key].name}</Link></td>
              <td>{copies[key].station.name}</td>
              <td>{copies[key].type}</td>
              <td>{copies[key].start_date}</td>
              <td>{copies[key].end_date}</td>
            </tr>
          ))}
            </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    copies: state.copies,
    copiesHasErrored: state.copiesHasErrored,
    copiesIsLoading: state.copiesIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    copiesFetchData: (url) => dispatch(copiesFetchData (url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopiesList);