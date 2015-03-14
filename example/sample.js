var algorithmia = require("../lib/algorithmia.js");

algorithmia.setApiKey(process.env.ALGORITHMIA_API_KEY);

var req = algorithmia.exec("kenny/Factor", 123);

req.success(function(result, duration) {
  console.log("Completed in "+duration+" seconds.");
  console.log(result);
});

req.error(function(err, responseCode, stacktrace) {
  console.error("ERROR "+responseCode+": "+err);
});

