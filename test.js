var bunyan = require( 'bunyan' );
var bunyanArangoDB = require( 'bunyan-arangodb' );
var _systemLogger = {
    'src': false,
    'name': 'systemLogger',
    'serializers': bunyan.stdSerializers,
    'streams': [ {
        'level': 'info',
        'stream': new bunyanArangoDB( {
            'collection': 'systemLog',
//            'collection': 'logs', // Default
//            'arangodb': 'myArangoDBinstance', // Optional
//            'username': 'someGuy', // Not necessary if passing ArangoDB instance
//            'password': 'myPassword', // Not necessary if passing ArangoDB instance
            'username': 'kurt',
            'password': 'Tbontbtitq!7',
            'server': 'http://127.0.0.1:8529',  // Default.
//            'dbName': '_system'  // Default.
            'db': 'cryptoEcosystem'
        } )
    } ]
}

var logger = bunyan.createLogger( _systemLogger );

logger.info( {
    'type' : 'authentication',
    'user': 'kurt'
}, 'Kurt just added an entry in the systemLog collection.' );

