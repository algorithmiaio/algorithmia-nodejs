var algorithmia = require("../lib/algorithmia.js");

algorithmia.setApiKey(process.env.ALGORITHMIA_API_KEY);

var req = algorithmia.exec("brejnko/UrlLinkList", "https://www.algorithmia.com");

req.success(function(result, duration) {
  console.log("Completed in "+duration+" seconds.");
  console.log(result);
});

req.error(function(err, responseCode, stacktrace) {
  console.error("ERROR "+responseCode+": "+err);
});

