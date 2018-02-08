/*
 * filter.js
 *
 * Take input and return filtered value
 */

class Filter {

    /*
     * Turn regular value into valid slug (lowercase letters, numbers, and hyphens only)
     */
    static slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    /*
     * Only allow slug characters (lowercase letters, numbers, and hyphens) but don't enforce trailing hyphen rule
     */
    static slugChars(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '');             // Trim - from start of text
    }

    /*
     * Filter input for phone number
     */
    static phone(text) {
        return text.toString().toLowerCase()
            .replace(/[^0-9\-\(\)\.\ ]/g,'')  // replace non-numeric characters (except parentheses, dashes, periods)
            .replace(/\-\-+/g, '-')           // Replace multiple - with single -
            .replace(/^-+/, '')               // Trim - from start of text
            .substr(0,14);                    // Max # of characters
    }

    /*
     * Numeric filter
     */
    static numeric(text) {
        return text.toString().toLowerCase()
            .replace(/[^0-9]/g,'');       // replace non-numeric characters
    }

    /*
     * Numeric filter
     */
    static marketron(text) {
        return text.toString().toLowerCase()
            .replace(/[^0-9]/g,'');       // replace non-numeric characters
    }

    /*
     * ZIP Code filter
     */
    static zip(text) {
        return text.toString().toLowerCase()
            .replace(/[^0-9\-]/g,'')    // replace non-numeric characters (except dashes)
            .replace(/\-\-+/g, '-')     // Replace multiple - with single -
            .replace(/^-+/, '')         // Trim - from start of text
            .substr(0,10);              // Max # of characters
    }

    /*
     * Decimal filter
     */
    static decimal(text) {
        return text.toString().toLowerCase()
            .replace(/[^0-9.]/g,'');       // replace non-numeric characters (except decimals, commas)
    }


    /*
     * Money
     */
    static money(text) {

        let filterVal = text.toString().toLowerCase()
            .replace(/[^0-9.]/g,'');

        if ( filterVal.substr(0,1) !== "$" ) {
            filterVal = "$" + filterVal;
        }

        return filterVal;      // replace non-numeric characters (except $, decimals, commas)
    }

}
export default Filter;