/*
 * flagship.js
 * Main Flagship frontend class to manage core functionality
 */

import axios from 'axios';
import config from '../constants/config';
import queryString from 'query-string';
import store from '../store/store';

class MarcoPromo {

  constructor() {
    this.config = config;
  }

  get( endpoint, query, callback, error ) {

    let self = this;

    let url = this.config.apiBase + endpoint + ( query !== {} ? '?' + queryString.stringify(query) : '' );
    let config = {
      //headers: {"X-Flagship-Token" : localStorage.getItem("flagshipToken")}
    };
    console.log(url);

    let result = new Promise(resolve => {
      let r = resolve;
      axios.get(url, config).then(function (response) {
        console.log(response);
        if (typeof callback === "function") {
          callback(response);
        }
        r(true);
      }).catch(function(err) {

        if (typeof error === "function") {
          error(err);
        } else {
          self.log(
            "error",
            {
              "Description": "API Error",
              "Endpoint": endpoint,
              "Method": "GET",
              "Query": query,
            }
          );
        }
        return false;
      });
      return result;
    });
  }


  post( endpoint, data, callback, error ) {

    let self = this;


    let url = this.config.apiBase + endpoint;
    let config = {
      //headers: {"X-Flagship-Token" : localStorage.getItem("flagshipToken")},
      ...data
    };

    let result = new Promise(resolve => {
      let r = resolve;
      axios.post(url,config).then( function(response) {

        if (typeof callback === "function") {
          callback(response);
        }
        r(true);
      }).catch( function(err) {

        if (typeof error === "function") {
          error(err);
        } else {
          self.log(
            "error",
            {
              "Description": "API Error",
              "Endpoint" : endpoint,
              "Method" : "POST",
              "Data" : data,
              "Error" : err.response
            }
          );
        }
        r(false);
      });
    });

    return result;
  }

  put( endpoint, data, callback, error ) {

    let self = this;


    let url = this.config.apiBase + endpoint;
    let config = {
      //headers: {"X-Flagship-Token" : localStorage.getItem("flagshipToken")},
      ...data
    };

    let result = new Promise(resolve => {
      let r = resolve;
      axios.put(url,config).then( function(response) {

        if (typeof callback === "function") {
          callback(response);
        }
        r(true);
      }).catch( function(err) {

        if (typeof error === "function") {
          error(err);
        } else {
          self.log(
            "error",
            {
              "Description": "API Error",
              "Endpoint" : endpoint,
              "Method" : "POST",
              "Data" : data,
              "Error" : err.response
            }
          );
        }
        r(false);
      });
    });

    return result;
  }

  log(action, data = '', target = null, user = null) {

    let logData = {
      action,
      data,
      target,
      user
    };

    console.log(logData);

    //this.post('log/write', logData);
  }

  event(action, data = '', target = null, user = null) {

    //this.log(action, data, target, user);
    this.sendMail(action, data, target, user);
  }

  error(message, target, user) {
    this.log("error", message, target, user);
  }


  redirect(path) {
    //browserHistory.push(path);
  }

}

export default new MarcoPromo();