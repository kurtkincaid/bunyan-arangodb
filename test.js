var bunyan = require( 'bunyan' );
var bunyanArangoDB = require( './index.js' );
var _systemLogger = {
    'src': false,
    'name': 'systemLogger',
    'serializers': bunyan.stdSerializers,
    'streams': [ {
        'level': 'info',
        'stream': new bunyanArangoDB( {
            'server': 'http://127.0.0.1:8529', // Default
            'db': '_system', // Default
            'collection': 'log', // Default
            'username': 'someGuy', // Required
            // 'agentOptions': {}, // Standard agentOptions that are permitted with http.Agent and https.Agent
            'password': 'myPassword' // Required
        } )
    } ]
}

var logger = bunyan.createLogger( _systemLogger );

logger.info( {
    'type' : 'authentication',
    'user': 'user123'
}, 'user123 successfully authenticated' );

