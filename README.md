# ArangoDB stream for Bunyan

This module has been tested with the following:

* bunyan 1.5.1
* aqb 2.0.2
* arrangojs 4.1.0
* ArangoDB 2.8.4 and 2.8.5

The module itself is very simple, so presumably it would work with versions other than those shown above.

# Installation

```sh
npm install bunyan-arangodb
```

# Basic Usage

```js
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
            'username': 'someGuy',
            'password': 'myPassword',
            'server': 'http://127.0.0.1:8529'  // default
            'db': '_system'  // default
        } )
    } ]
}

var logger = bunyan.createLogger( _systemLogger );

logger.info( {
    'type' : 'notice',
    'user': 'kurt'
}, 'Kurt just added an entry in the systemLog collection.' );
```
# API

Still working on the documentation....
