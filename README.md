algorithmia-nodejs
==============

A nodejs library for calling algorithms on Algorithmia.com with partial support for the DataAPI

[![npm](https://img.shields.io/npm/v/algorithmia.svg?maxAge=2592000)]()

## Getting started

The official Algorithmia nodejs client is available on NPM.
Install it for your project by adding `algorithmia` to your package.json:

```bash
npm install --save algorithmia
```

Then instantiate an Algorithmia client using your API key:

```javascript
import { Algorithmia } from '../src/Algorithmia';

let client: AlgorithmiaClient = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY);
```

Now you are ready to call algorithms.

## Calling algorithms

The following examples of calling algorithms are organized by type of input/output which vary between algorithms.

Note: a single algorithm may have different input and output types, or accept multiple types of input, so consult the algorithm's description for usage examples specific to that algorithm.

### Text input/output

Call an algorithm with text input by passing a string into the `pipe` method.
The returned promise will be called with the response with the Algorithm completes (or when an error occurs).
If the algorithm output is text, then the `get()` method on the response will return a string.

```javascript
client.algo("algo://demo/Hello/0.1.1").pipe("HAL 9000").then(x => { console.log(x) });
// -> Hello HAL 9000
```

### JSON input/output

Call an algorithm with JSON input by passing in a native JavaScript type;
most of the time this will be an `Object` or an `Array` (though `Boolean`, `Number`, and `Null` are possible).

```javascript
client.algo("algo://WebPredict/ListAnagrams/0.1.0").pipe(["transformer", "terraforms", "retransform"]).then(x => { console.log(x) });
// -> ["transformer","retransform"]
```

### Binary input/output

Call an algorithm with binary input by passing a `Buffer` into the pipe method.

```javascript
var buffer = fs.readFileSync("/path/to/bender.jpg");
client.algo("opencv/SmartThumbnail").pipe(buffer).then(x => { console.log(x) });
// -> Buffer(...)
```

### Error handling

If an error occurs when calling an algorithm, the response will contain an error field that you can check:

```javascript
client.algo('util/whoopsWrongAlgo').pipe('Hello, world!').then(x => { console.log(x) });
```

### Request options

The Algorithmia API exposes parameters to configure algorithm requests including support
for changing the timeout of indicating that the API should include stdout in the response.
Currently, the node.js client exposes these as query paremeters to the algorithm URI:

```javascript
client.algo("algo://demo/Hello/0.1.1?timeout=10&stdout=true").pipe("HAL 9000");
```

Note: `stdout=true` is only supported if you have access to the algorithm source.

## Working with data

The Algorithmia client also provides a way to manage both Algorithmia hosted data and data from Dropbox or S3 accounts that you've connected to you Algorithmia account.

### Create directories

Create directories by instantiating a `DataDir` object and calling `post()`:

```javascript
let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('Insert directory path');
await dir.post('Insert directory path');
```

### Upload files to a directory

Upload files by calling the `file` method a `DataDir` object or `put` on a `DataFile` object:

```javascript
let file: DataFile = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('Insert file path');
await file.put('Insert your file body');

let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('Insert directory path');
let file: DataFile = dir.file('Insert file path');
await dir.put(file.baseName(), 'Insert your file body');
```

### Download content from files

Download files by calling `get` on a `DataFile` object:

```javascript
let file: DataFile = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('Insert file path');
await file.get().then(x => { console.log(x) });

let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('Insert directory path');
await dir.get().then(x => { console.log(x) });
```

### Delete files and directories

Delete files by calling `delete` on their respective `DataFile` or `DataDir` object.
When deleting directories, you may optionally specify a `force` argument
that indicates whether or not a directory should be deleted if it contains files or other directories (default = `false`).

```javascript
let file: DataFile = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('Insert file path');
await file.delete().then(x => { console.log(x) });

let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('Insert directory path');
await dir.delete(true).then(x => { console.log(x) });
```

## Building the client

This project uses typescript compile.

```bash
npm install typescript -g && npm install @types/node

tsc
```

Note: Don't edit the .js in the `lib` directory; they will get overwritten on subsequent compiles.
Instead, modify `.ts` files in the `src` dir, and run `tsc`.
