algorithmia.js
==============

A nodejs library for calling algorithms on Algorithmia.com with partial support for the DataAPI

[![npm](https://img.shields.io/npm/v/algorithmia.svg?maxAge=2592000)]()

## Installation

The official Algorithmia nodejs client is available on NPM. 
Install it for your project by adding `algorithmia` to your package.json:

```bash
npm install --save algorithmia
```

## Authentication

First, create an Algorithmia client: 

```javascript
var algorithmia = require("algorithmia");

var client = algorithmia(process.env.ALGORITHMIA_API_KEY);
```

Now you are ready to call algorithms.

## Calling Algorithms

The following examples of calling algorithms are organized by type of input/output which vary between algorithms.

Note: a single algorithm may have different input and output types, or accept multiple types of input, so consult the algorithm's description for usage examples specific to that algorithm.

### Text input/output

Call an algorithm with text input by passing a string into the `pipe` method.
The returned promise will be called with the response with the Algorithm completes (or when an error occurs).
If the algorithm output is text, then the `get()` method on the response will return a string.

```javascript
client.algo("algo://demo/Hello/0.1.1")
      .pipe("HAL 9000")
      .then(function(response) {
        console.log(response.get());
      });
// -> Hello HAL 9000
```

### JSON input/output

Call an algorithm with JSON input by passing in a native JavaScript type;
most of the time this will be an `Object` or an `Array` (though `Boolean`, `Number`, and `Null` are possible). 
Similarly, if the algorithm response is JSON, the `get()` method will return the appropriate native JavaScript type. 

```javascript
client.algo("algo://WebPredict/ListAnagrams/0.1.0")
      .pipe(["transformer", "terraforms", "retransform"])
      .then(function(response) {
        console.log(response.get());
        // -> ["transformer","retransform"]
      });
```

Alternatively, if you already have serialized JSON, you can call `pipeJson` with the raw JSON string.
The following example makes the same API call as the previous example:

```javascript
client.algo("algo://WebPredict/ListAnagrams/0.1.0")
      .pipeJson('["transformer", "terraforms", "retransform"]')
```

### Binary input/output

Call an algorithm with binary input by passing a `Buffer` into the pipe method. 
Similarly, if the algorithm response is binary data, then the `get` method on the response will be a byte array.

```javascript
var buffer = fs.readFileSync("/path/to/bender.jpg");
client.algo("opencv/SmartThumbnail")
    .pipe(buffer)
    .then(function(response) {
        var buffer = response.get();
        // -> Buffer(...)
    });
```

Note: while it is possible to use `response.result` for text or JSON responses, in the case of a binary resonse,
the `result` field will be base64-encoded. The `get()` method is recommended 
because it will return the correct type in all cases.

### Error handling

If an error occurs when calling an algorithm, the response will contain an error field that you can check:

```javascript
client.algo('util/whoopsWrongAlgo').pipe('Hello, world!')
      .then(function(response) {
          if(response.error) {
            console.log("Error: " + response.error.message);    
          } {
            console.log(response.get());
          }
      });
```

Alternatively, the `get()` will throw an exception if an error occurred:

```javascript
client.algo('util/whoopsWrongAlgo').pipe('Hello, world!')
      .then(function(response) {
          try {
            console.log(response.get());    
          } catch(err) {
            console.log("Error: " + err);
          }
      });
```

### Request options

The Algorithmia API exposes parameters to configure algorithm requests including support 
for changing the timeout of indicating that the API should include stdout in the response.
Currently, the node.js client exposes these as query paremeters to the algorithm URI:

```javascript
client.algo("algo://demo/Hello/0.1.1?timeout=10&stdout=true")
      .pipe("HAL 9000")
```

Note: `stdout=true` is only supported if you have access to the algorithm source.

## Working with data

The Algorithmia client also provides a way to manage both Algorithmia hosted data and data from Dropbox or S3 accounts that you've connected to you Algorithmia account.

Create and read files (strings and JSON)
```javascript
var algorithmia = require("algorithmia");

var client = algorithmia(process.env.ALGORITHMIA_API_KEY);
var content = "Hello!";

// using putString, other options: getString, putJson, getJson
client.file("data://.my/Test/foo.txt").putString(content, function(response) {
    if (response.error) {
        console.log(response.error);
    } else {
        console.log(response.result);
    }
});
```


## Building the client

This project uses gulp to compile coffeescript.

```bash
# install dev dependencies and gulp-cli wrapper
npm install
npm install -g gulp-cli

# compile coffeescript
gulp
```

