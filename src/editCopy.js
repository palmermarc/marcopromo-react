import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom'
import './assets/css/style.css';
import './assets/css/tables.css';

import { copyFetchData } from './_actions/actions.copies';

class CopyEdit extends React.Component {

  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let copyid = parseInt(this.props.match.params.copyid);
    if( isNaN( copyid ) || copyid === 0 ) {

    } else  {
      this.props.copyFetchData('http://marcopromo.api/copies/' + copyid);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  render() {
    if (this.props.copyHasErrored) {
      return <p>Sorry! There was an error loading the copies. If this problem persists, please notify the digital team.</p>;
    }

    if (this.props.copyIsLoading) {
      return <p>Loading copy, please hold…</p>;
    }

    let copyid = parseInt(this.props.match.params.copyid);
    console.log(copyid);
    if ( isNaN( copyid ) ) {
      <Redirect to="/copy/" />
    }

    let copy = this.props.copy;

    return (
      <div className="wrap">
        <h1 className="page-title">Copies</h1>
        <Link className="page-title-action" to="/copy/add">Add New Copy</Link>
        <div className="clear"></div>
        <div id="poststuff">
          <input onChange={this.handleChange} id="title" placeholder="Copy Title" className="widefat" type="text" name="name" value={copy.name} />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    copy: state.copy,
    copyHasErrored: state.copyHasErrored,
    copyIsLoading: state.copyIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    copyFetchData: (url) => dispatch(copyFetchData (url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyEdit);