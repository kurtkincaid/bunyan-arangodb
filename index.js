/**
 * @fileOverview Bunyan stream for ArangoDB
 * @author Kurt Kincaid
 * @version 0.3.1
 */

var url = require( 'url' );
var debug = require( 'debug' )( 'bunyan-arangodb' );

/**
 * Main module constructor
 * 
 * Options/Defaults:
 * 
 *  opts = {
 *      'collection': 'logs', // Optional. Default: logs
 *      'username': '', // Required. No default.
 *      'password': '', // Required. No default.
 *      'server': 'http://localhost:8529', // Optional. Default: http://localhost:8529
 *      'db': '_system', // Optional. Default: _system,
 *      'port': 8529 // Optional. Default: 8529. Ignored if port is specified as part of 'server'
 *  }
 */
function bunyanArangoDB( opts ) {
    opts = opts || {};
    this.server = opts.server || 'http://127.0.0.1';
    var u = url.parse( opts.server || 'http://127.0.0.1:8529' );
    this.server = u.hostname;
    this.port = u.port || opts.port || 8529;
    this.db = opts.db || '_system';
    this.username = opts.username;
    this.password = opts.password;
    this.connectString = `${u.protocol}//${this.username}:${this.password}@${this.server}:${this.port}`;
    var arangodb;
    try {
        arangodb = require( 'arangojs' )( this.connectString );
        arangodb.useDatabase( this.db );
        this.aqlQuery = require( 'arangojs' ).aqlQuery;
        this.collection = arangodb.collection( opts.collection || 'logs' );
        this.arangodb = arangodb;

    }
    catch( e ) {
        return e;
    }
}

/**
 * Function for parsing and storing raw log data in ArangoDB
 *
 * @param {Object} entry Raw Bunyan log data
 */
bunyanArangoDB.prototype.write = function( entry ) {
        this.arangodb.query( this.aqlQuery `INSERT ${JSON.parse( entry )} IN ${this.collection}`
    ).then( ( r ) => {
        // Not doing anything with the results. Return them, maybe?
        debug( `Write successful: ${JSON.stringify( r, null, 2 )}` );
        return null;
    } ).catch( ( e ) => {
        debug( `ERROR: ${e}` );
        return e;
    } );
};

module.exports = bunyanArangoDB;
