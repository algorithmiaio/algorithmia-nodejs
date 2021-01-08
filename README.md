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
const algorithmia = require('algorithmia');

let client: AlgorithmiaClient = algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY);
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
const response = await client.algo("algo://demo/Hello/0.1.1").pipe("HAL 9000");
// -> Hello HAL 9000
```

### JSON input/output

Call an algorithm with JSON input by passing in a native JavaScript type;
most of the time this will be an `Object` or an `Array` (though `Boolean`, `Number`, and `Null` are possible).

```javascript
const response = await client.algo("algo://WebPredict/ListAnagrams/0.1.0").pipe(["transformer", "terraforms", "retransform"]);
// -> ["transformer","retransform"]
```

### Binary input/output

Call an algorithm with binary input by passing a `Buffer` into the pipe method.

```javascript
var buffer = fs.readFileSync("/path/to/bender.jpg");
const response = await client.algo("opencv/SmartThumbnail").pipe(buffer);
// -> Buffer(...)
```

### Error handling

If an error occurs when calling an algorithm, the response will contain an error field that you can check:

```javascript
const response = await client.algo('util/whoopsWrongAlgo').pipe('Hello, world!');
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

Create directories by instantiating a `DataDir` object and calling `create()`:

```javascript
let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('Insert directory path');
await dir.create('Insert directory path');
```

### Upload files to a directory

Upload files by calling the `file` method a `DataDir` object or `put` on a `DataFile` object:

```javascript
let file: DataFile = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('Insert file path');
await file.put('Insert your file body');

let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('Insert directory path');
let file: DataFile = dir.file('Insert file path');
await dir.put(file.baseName(), 'Insert your file body');

let dir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('Insert directory path');
await dir.putFile(resolve('Insert local file path'));
```

### Download content from files

Download files by calling `get` on a `DataFile` object:

```javascript
let file: DataFile = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('Insert file path');
const response = await file.get();

let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('Insert directory path');
const response = await dir.get();
```

### Delete files and directories

Delete files by calling `delete` on their respective `DataFile` or `DataDir` object.
When deleting directories, you may optionally specify a `force` argument
that indicates whether or not a directory should be deleted if it contains files or other directories (default = `false`).

```javascript
let file: DataFile = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('Insert file path');
const response = await file.delete();

let dir: DataDir = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).dir('Insert directory path');
const response = await dir.delete(true);
```

### Algo API's

| Name | Parameters | Example |
| :---------- | :---------- | :---------- |
| Get Algorithm | String userName - Your Algorithmia user name.<br>String algoName - The name address of the algorithm. | const algorithm: Algorithm = JSON.parse(await Algorithmia.getClient(key).getAlgo(userName, algoName)); | 
| List Algorithm Versions | String userName - Your Algorithmia user name.<br>String algoName - The name address of the algorithm.<br>Boolean callable - Whether to return only public or private algorithm versions.<br>Integer limit - Items per page.<br>Boolean published - Whether to return only versions that have been published.<br>String marker - Marker for pagination. | const algorithmVersionsList: AlgorithmVersionsList = JSON.parse(await Algorithmia.getClient(key).listAlgoVersions(userName, algoName)); |
| List Algorithm Builds | String userName - Your Algorithmia user name.<br>String algoName - The name address of the algorithm.<br>Integer limit - Items per page.<br>String marker - Marker for pagination. | const algorithmBuildsList: AlgorithmBuildsList = JSON.parse(await Algorithmia.getClient(key).listAlgoBuilds(userName, algoName)); |
| Get Algorithm Build Logs | String userName - Your Algorithmia user name.<br>String algoName - The name address of the algorithm.<br>String buildId - The id of the build to retrieve logs. | const response: [] = JSON.parse(await Algorithmia.getClient(key).getAlgoBuildLogs(userName, algoName, buildId)); |
| Delete Algorithm | String userName - Your Algorithmia user name.<br>String algoName - The name address of the algorithm. | const response = await Algorithmia.getClient(key).deleteAlgo(userName, algoName); |
| Create Algorithm | String userName - Your Algorithmia user name.<br>String requestString - JSON payload for the Algorithm you wish to create. | const algorithm: Algorithm = JSON.parse(await Algorithmia.getClient(key).createAlgo(userName, algoJson)); | 
| List Cluster SCM’s | - | const response: SCM[] = JSON.parse(await Algorithmia.getClient(key).listSCMs()); |
| Get SCM | String scmId - The id of scm to retrive | const scm: SCM = JSON.parse(await Algorithmia.getClient(key).getSCM(scmId)); |
| Query SCM Authorization Status | String scmId - The id of scm status to retrive | const scmAuth: AlgorithmSCMAuthorizationStatus = JSON.parse(await Algorithmia.getClient(key).querySCMStatus(scmId)); |

## Building the client

This project uses typescript compile.

```bash
npm install typescript -g && npm install @types/node

tsc
```

Note: Don't edit the .js in the `lib` directory; they will get overwritten on subsequent compiles.
Instead, modify `.ts` files in the `src` dir, and run `tsc`.
