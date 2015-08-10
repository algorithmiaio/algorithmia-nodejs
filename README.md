algorithmia.js
==============

A nodejs library for calling algorithms on Algorithmia.com with partial support fo the DataAPI


Usage
=====

Add algorithmia to your package.json

    npm install --save algorithmia


Call any algorithm on the Algorithmia platform:

```javascript
var algorithmia = require("algorithmia");

var client = algorithmia(process.env.ALGORITHMIA_API_KEY);
var input = "5";

client.algo("docs/JavaAddOne").pipe(input).then(function(output) {
    if (output.error) {
        console.log(output.error);
    } else {
        console.log(output.result);
    }
});
```

Create and read files (strings and JSON)
```javascript
var algorithmia = require("algorithmia");

var client = algorithmia(process.env.ALGORITHMIA_API_KEY);
var content = "Hello!";

// using putString, other options: getString, putJson, getJson
client.file("data://.my/Test/foo.txt").putString(content, function(output) {
    if (output.error) {
        console.log(output.error);
    } else {
        console.log(output.result);
    }
});
```

See /examples for more.

Build
=====

Currently tested with nodejs v0.10.36

    # install dev dependencies and gulp-cli wrapper
    npm install
    npm install -g gulp-cli

    # compile coffeescript
    gulp


TODO
=====
    * Add tests
    * Support DataAPI binary input/output
    * Support DataAPI directory functions
