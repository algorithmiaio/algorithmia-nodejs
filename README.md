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

### Create directories

Create directories by instantiating a `Dir` object and calling `create()`:

```javascript
var robots = client.dir("data://.my/robots");
robots.create(function(response) {
    if(response.error) {
        return console.log("Failed to create dir: " + response.error.message);
    }
    console.log("Created directory: " + robots.data_path);
});
```

### Upload files to a directory

Upload files by calling a `put` method on a `File` object:

```javascript
var robots = client.dir("data://.my/robots");
robots.file("Optimus_Prime.txt")
    .putString("Leader of the Autobots", function(response) {
        if(response.error) {
            return console.log("Failed to upload file: " + response.error.message);
        }
        console.log("File uploaded.");
    );
```

Note: [Issue #4](https://github.com/algorithmiaio/algorithmia-nodejs/issues/4)
is tracking better support for uploading files, including binary files.

### Download content from files

Download files by calling `getString` or  `getJson` on a `File` object:

```javascript
var robots = client.dir("data://.my/robots");

// Get the file's contents as a string
robots.file("T-800.txt").getString(function(response) {
    console.log(response);
});

// Get a JSON file's contents as a JS object
robots.file("T-800.json").getJson(function(response) {
    console.log(response);
});
```

Note: [Issue #4](https://github.com/algorithmiaio/algorithmia-nodejs/issues/4)
is tracking better support for downloading files, including binary files.


### Delete files and directories

Delete files by calling `delete` on their respective `File` or `Dir` object.
When deleting directories, you may optionally specify a `force` argument
that indicates whether or not a directory should be deleted if it contains files or other directories (default = `false`).

```javascript
var c3po = client.file("data://.my/robots/C-3PO.txt");
c3po.delete(function(response) {
    if(response.error) {
        return console.log("Failed to delete file: " + response.error.message);
    }
    console.log("Deleted file: " + c3po.data_path);
});

// Force delete a directory
client.dir("data://.my/robots")
    .delete(true, function(response) {
        /* ommitting callback implementation */
    });
```

### List directory contents

Iterate over the contents of a directory using the iterated returned by calling `forEachDir` or `forEachFile` on a `Dir` object:

```javascript
// List top level directories
client.dir("data://.my").forEachDir(function(err, dir) {
    if(err) {
        return console.log("Error: " + JSON.stringify(err));
    }
    console.log(dir.data_path);
}).then(function() {
    console.log("Finished listing directory");
});


// List files in the Public folder of your connected Dropbox account
client.dir("dropbox://Public").forEachFile(function(err, file) {
    if(err) {
        return console.log("Error: " + JSON.stringify(err));
    }
    console.log(file.data_path);
}).then(function() {
    console.log("Finished listing directory");
});
```

## Building the client

Don't edit the .js in the lib directory.
This project uses gulp to compile coffeescript.
Edit `.coffee` files in `src` and build the `lib` directory by running:

```bash
npm install
npm install -g gulp-cli

# compile coffeescript
gulp
```

