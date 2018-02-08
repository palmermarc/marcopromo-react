/*
 * helpers.js
 *
 * Various helper functions
 */

import moment from 'moment';
import React from 'react';
import MarcoPromo from '../core/MarcoPromo';
import { Link } from 'react-router-dom'

export function throttle(fn, delay, timer = null) {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
    return timer;
}

function getLinkedTitle( data, includeKey ) {
    if (!empty(data) && !empty(data.link) && !empty(data.key) && !empty(data.name)) {
        return (
            <Link to={data.link}>
                {(includeKey === true ? '#' + data.key + ' - ' + data.name : data.name)}
            </Link>
        );
    } else if (typeof data === "string"){
        return data;
    } else {
        return "Unknown";
    }

}

export function getFormattedValue(value, format = 'text') {

    let formattedValue = value;

    // Format an individual value
    const formatValue = (value, format) => {
        let newValue = value;
        if (format === "date") {
            if (!empty(value)) {
                newValue = moment.unix(newValue).format("MM/DD/YYYY");            }
        } else if (format === "time ago") {
            newValue = moment(value).fromNow();
        } else if (format === "money") {
            if (typeof newValue !== "string" || newValue.charAt(0) !== "$") {
                newValue = "$" + newValue;
            }
        }
        return newValue;
    };

    if (Array.isArray(value)) {
        return (
            <div>
                {value.map(function(val) {
                    return (
                        <div>
                        {formatValue(val, format)}
                        </div>
                    );
                })}
            </div>
        );


    } else {
        return formatValue(formattedValue, format);
    }
}


/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

// Asynchronous version of `setRouteLeaveHook`.
// Instead of synchronously returning a result, the hook is expected to
// return a promise.
export function setAsyncRouteLeaveHook(router, route, hook) {
    let withinHook = false;
    let finalResult = undefined;
    let finalResultSet = false;
    router.setRouteLeaveHook(route, nextLocation => {
        withinHook = true;
        if (!finalResultSet) {
            hook(nextLocation).then(result => {
                finalResult = result;
                finalResultSet = true;
                if (!withinHook && nextLocation) {
                    // Re-schedule the navigation
                    router.push(nextLocation)
                }
            })
        }
        let result = finalResultSet ? finalResult : false;
        withinHook = false;
        finalResult = undefined;
        finalResultSet = false;
        return result
    })
}

// Determine whether or not a field should be shown, given other field data
export function shouldShowField( field, fieldData ) {
    if (!field.hasOwnProperty("where") || field.where === "" || field.where === [] || field.where === null) {
        return true;
    }

    let result = true;

    if (typeof field.where.map !== "function" && typeof field.where === "object") {
        field.where = [field.where];
    }

    if (typeof field.where.map === "function") {
        field.where.map(function (where) {
            if (
                !where.hasOwnProperty("field") ||
                !where.hasOwnProperty("check") ||
                !where.hasOwnProperty("against")
            ) {
                result = false;
                return false;
            } else {
                switch (where.check) {

                    case "=":
                        if (fieldData[where.field] !== where.against) {
                            result = false;
                        }
                        break;
                    case "!=":
                        if (where.against === "" && typeof fieldData[where.field] === "undefined") {
                            result = false;
                        } else if (fieldData[where.field] === where.against) {
                            result = false;
                        }
                        break;
                    case "in":
                        if (!where.against.includes(fieldData[where.field])) {
                            result = false;
                        }
                        break;
                    case "not in":
                        if (where.against.includes(fieldData[where.field])) {
                            result = false;
                        }
                        break;
                }
            }

        });
    }
    return result;
}

export function empty(variable) {
    return (
        typeof variable === "undefined" ||
        variable === "" ||
        variable === null ||
        variable === [] ||
        Object.keys(variable).length === 0 && variable.constructor === Object);
}

export function renderFieldValue(value, format = '') {
    if( Array.isArray(value)) {

        return value.map(function (val, i) {
            return (
                <div key={"value-" + i}>
                    {getFormattedValue(val, format)}
                </div>
            );
        });
    } else {
        return getFormattedValue(value, format);
    }
}

export function clean(obj) {
    for (let propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            obj[propName] = '';
        }
    }
    return obj;
}

export function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
