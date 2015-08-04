var exports, http, https, url;

http = require('http');
https = require('https');
url = require('url');

algorithmia = function(key) {
  // construct a new client object
  var client = new Object();
  client.path = "https://api.algorithmia.com/v1/algo/";

  // make sure key starts with Simple
  if (key.indexOf("Simple ") == 0)
    client.key = key;
  else
    client.key = "Simple " + key;

  // *** Algo
  client.algo = function(name) {
    this.url = client.path + name;
    return this;
  };

  // *** Pipe
  client.pipe = function(params) {
    this.params = params;

    if (typeof params === "object" || typeof params === "string")
      this.data = JSON.stringify(params);
    else
      this.data = params + "";

    return this;
  };

  // *** Then
  client.then = function(callback) {
    this.callback = callback;

    // make options
    var options = url.parse(this.url);
    options.method = "POST";
    options.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": client.key,
      "User-Agent": "NodeJS/" + process.version
    };

    // trigger call
    var req = https.request(options, function(res) {
      res.setEncoding("utf8");
      var chunks = [];

      res.on("data", function(chunk) {
        return chunks.push(chunk);
      });

      res.on("end", function() {
        var json = chunks.join("");
        var body = JSON.parse(json);

        if (callback)
        {
          if (res.statusCode !== 200)
          {
            if (!body) body = {};
            if (!body.error) body.error = {message: "HTTP Response: " + res.statusCode};
          }

          callback(body);
        }
      });

      return res;
    });

    req.write(client.data);
    req.end();

    return this;
  };

  return client;
};


module.exports = exports = algorithmia;
