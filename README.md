algorithmia.js
==============

A nodejs library for calling algorithms on Algorithmia.com


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
	if (output.error)
		console.log(output.error);

	console.log(output.result);
});
```

Build
=====

Currently tested with nodejs v0.10.36

    # install dev dependencies
    npm install

    # compile coffeescript
    gulp
