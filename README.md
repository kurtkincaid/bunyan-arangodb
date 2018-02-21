# ArangoDB stream for Bunyan

[![Known Vulnerabilities](https://snyk.io/test/github/kurtkincaid/bunyan-arangodb/badge.svg)](https://snyk.io/test/github/kurtkincaid/bunyan-arangodb)

A simple and configurable ArangoDB for Bunyan. The module itself is relatively simple, so it should work with most versions of ArangoDB and the module dependencies.

Please note: This module will not create the database and/or collection for you. These must already exist in your ArangoDB instance when your code is run.

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
            'agentOptions': {}, // Standard agentOptions that are permitted with http.Agent and https.Agent (Optional)
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

Usage is straight forward and relatively simple. Starting with v1.0.0, you can pass *agentOptions*, which will allow for things such as trusting certificates issued from internal CAs.
