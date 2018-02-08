/*
 * validate.js
 *
 * Take a single value and validate it; return an object with a `valid` prop to indicate validity,
 * as well as am optional `message` prop to explain an invalid value.
 */

class Validate {
    /*
     * Slug validation (lowercase letters, numbers, & hyphens)
     */
    static slug(value) {
        if (value.endsWith("-") === true) {
            return {
                valid: false,
                message: "Slug can not end with a hyphen."
            }
        } else if ((new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).test(value) !== true) {
            return {
                valid: false,
                message: "Slug can only contain lowercase letters, numbers, and hyphens."
            }
        } else {
            return {
                valid: true
            }
        }
    }

    /*
     * Email validation
     */
    static email(value) {
        if (value !== '' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) !== true) {
            return {
                valid: false,
                message: "This doesn't look like a valid email address."
            }
        } else {
            return {
                valid: true
            }
        }
    }

    /*
     * Phone validation
     */
    static phone(value) {
        let regex =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (value !== '' && !value.match(regex)) {
            return {
                valid: false,
                message: "This doesn't look like a valid phone number."
            }
        } else {
            return {
                valid: true
            }
        }
    }

    /*
     * ZIP Code validation
     */
    static zip(value) {

        if (value !== '' &&  /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value) !== true) {
            return {
                valid: false,
                message: "This doesn't look like a valid ZIP code."
            }
        } else {
            return {
                valid: true
            }
        }
    }

    /*
     * Marketron Number validation
     */
    static marketron(value) {

        let invalidNumbers = [
            "TBA",
            "TBD",
            "0000000",
            "1111111",
            "2222222",
            "3333333",
            "4444444",
            "5555555",
            "6666666",
            "7777777",
            "8888888",
            "9999999",
            "1234567"
        ];

        if (value !== '' && (invalidNumbers.includes(value) || /(^\d{7}$)/.test(value) !== true)) {
            return {
                valid: false,
                message: "This doesn't look like a valid marketron number (sorry, no cheating)."
            }
        } else {
            return {
                valid: true
            }
        }
    }

    /*
     * URL validation
     */
    static url(value) {

        if (value !== '' &&  /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value) !== true) {
            return {
                valid: false,
                message: "This doesn't look like a valid URL."
            }
        } else {
            return {
                valid: true
            }
        }
    }

    /*
     * Money
     */
    static money(value) {
        if (value !== '' && /(?=.)^\$?(([1-9][0-9]{0,2}(,?[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/.test(value) !== true) {
            return {
                valid: false,
                message: "This doesn't look like a valid dollar amount."
            }
        } else {
            return {
                valid:true
            }
        }
    }

}
export default Validate;