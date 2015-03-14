var algorithmia, exports, http, https, url;

http = require('http');

https = require('https');

url = require('url');

algorithmia = {
  apiAddress: "https://api.algorithmia.com",
  setApiKey: function(apiKey) {
    return algorithmia.apiKey = apiKey;
  },
  exec: function(algo, data) {
    var chain, errorCb, options, req, sendData, successCb, transport;
    successCb = function(result, duration) {
      return console.log("Not handling success");
    };
    errorCb = function(statusCode, err, stacktrace) {
      return console.log("Not handling error");
    };
    options = url.parse(algorithmia.apiAddress + "/api/" + algo);
    options.method = 'POST';
    options.headers || (options.headers = {});
    options.headers['Accept'] = 'application/json';
    if (algorithmia.apiKey) {
      options.headers['Authorization'] = algorithmia.apiKey;
    } else {
      console.log("WARNING: API Key not set");
    }
    if (typeof data === 'object') {
      options.headers['Content-Type'] = 'application/json';
      sendData = JSON.stringify(data);
    } else {
      sendData = '' + data;
    }
    transport = options.protocol === "https:" ? https : http;
    req = transport.request(options, function(res) {
      var chunks;
      res.setEncoding('utf8');
      chunks = [];
      res.on('data', function(chunk) {
        return chunks.push(chunk);
      });
      return res.on('end', function() {
        var body, json;
        json = chunks.join('');
        body = JSON.parse(json);
        if (res.statusCode !== 200 || body.error) {
          return errorCb(body != null ? body.error : void 0, res.statusCode, body != null ? body.stacktrace : void 0);
        } else {
          return successCb(body.result, body.duration);
        }
      });
    });
    req.write(sendData);
    req.end();
    return chain = {
      success: function(cb) {
        return successCb = cb;
      },
      error: function(cb) {
        return errorCb = cb;
      }
    };
  }
};

module.exports = exports = algorithmia;
