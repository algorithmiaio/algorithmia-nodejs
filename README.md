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

algorithmia.setApiKey(process.env.ALGORITHMIA_API_KEY);

var req = algorithmia.exec("brejnko/UrlLinkList", "https://www.algorithmia.com");

req.success(function(result, duration) {
  console.log("Completed in "+duration+" seconds.");
  console.log(result);
});

req.error(function(err, responseCode, stacktrace) {
  console.error("ERROR "+responseCode+": "+err);
});
```

Build
=====

Currently tested with nodejs v0.10.36

    # install dev dependencies
    npm install

    # compile coffeescript
    gulp
