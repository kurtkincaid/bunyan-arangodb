var bunyan = require( 'bunyan' );
var bunyanArangoDB = require( 'bunyan-arangodb' );
var _systemLogger = {
    'src': false,
    'name': 'systemLogger',
    'serializers': bunyan.stdSerializers,
    'streams': [ {
        'level': 'info',
        'stream': new bunyanArangoDB( {
            'collection': 'logs', // Default
            'username': 'someGuy', // Required
            'password': 'myPassword', // Required
            'server': 'http://127.0.0.1:8529',  // Default.
            'db': '_system'  // Default.
        } )
    } ]
}

var logger = bunyan.createLogger( _systemLogger );

logger.info( {
    'type' : 'authentication',
    'user': 'user123'
}, 'user123 successfully authenticated' );

