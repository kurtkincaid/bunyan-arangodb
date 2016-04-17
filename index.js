/**
 * @fileOverview Bunyan stream for ArangoDB
 * @author Kurt Kincaid
 * @version 0.1.0
 */

var qb = require( 'aqb' );

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
    this.port = opts.port || 8529;
    this.db = opts.db || '_system';
    this.collection = opts.collection || 'logs';
    this.username = opts.username;
    this.password = opts.password;
    var x = this.server.match( /^(\w+:\/\/)(.*)/ );
    this.protocol = x[ 1 ];
    var y;
    if ( y = x[ 2 ].match( /^(.*):(\d+)/ ) ) {
        this.server = y[ 1 ];
        this.port = y[ 2 ];
    }
    else {
        this.server = x[ 2 ];
    }
    this.connectString = `${this.protocol}${this.username}:${this.password}@${this.server}:${this.port}`;
    var arangodb;
    try {
        arangodb = require( 'arangojs' )( this.connectString );
        arangodb.useDatabase( this.db );
    }
    catch( e ) {
        return e;
    }
    this.arangodb = arangodb;
}

/**
 * Function for parsing and storing raw log data in ArangoDB
 *
 * @param {Object} entry Raw Bunyan log data
 */
bunyanArangoDB.prototype.write = function( entry ) {
    var item = JSON.parse( entry );
    this.arangodb.query(
        qb.insert( qb( item ) ).into( this.collection )
    ).then( r => {
        // Not doing anything with the results. Return them, maybe?
        return;
    } ).catch( e => {
        return e;
    } );
};

module.exports = bunyanArangoDB;
