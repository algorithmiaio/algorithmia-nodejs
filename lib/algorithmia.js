var Algorithm, AlgorithmiaClient, Data, algorithmia, defaultApiAddress, exports, http, https, url;

https = require('https');

http = require('http');

url = require('url');

Algorithm = require('./algorithm.js');

Data = require('./data.js');

defaultApiAddress = 'https://api.algorithmia.com/v1/';

AlgorithmiaClient = (function() {
  function AlgorithmiaClient(key, address) {
    this.apiAddress = address || defaultApiAddress;
    if (key) {
      if (key.indexOf('Simple ') === 0) {
        this.apiKey = key;
      } else {
        this.apiKey = 'Simple ' + key;
      }
    } else {
      this.apiKey = '';
    }
  }

  AlgorithmiaClient.prototype.algo = function(path) {
    return new Algorithm(this, path);
  };

  AlgorithmiaClient.prototype.file = function(path) {
    return new Data(this, path);
  };

  AlgorithmiaClient.prototype.req = function(path, method, data, cheaders, callback) {
    var dheader, key, options, req, request, val;
    dheader = {
      'Content-Type': 'application/JSON',
      'Accept': 'application/JSON',
      'Authorization': this.apiKey,
      'User-Agent': 'NodeJS/' + process.version
    };
    for (key in cheaders) {
      val = cheaders[key];
      dheader[key] = val;
    }
    options = url.parse(this.apiAddress + path);
    options.method = method;
    options.headers = dheader;
    request = function(options, cb) {
      if (options.protocol === "https:") {
        return https.request(options, cb);
      } else if (options.protocol === "http:") {
        return http.request(options, cb);
      } else {
        return console.error("Invalid api address " + options.path);
      }
    };
    req = request(options, function(res) {
      var chunks;
      res.setEncoding('utf8');
      chunks = [];
      res.on('data', function(chunk) {
        return chunks.push(chunk);
      });
      res.on('end', function() {
        var body, buff;
        buff = chunks.join('');
        if (dheader['Accept'] === 'application/JSON') {
          body = JSON.parse(buff);
        } else {
          body = buff;
        }
        if (callback) {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            if (!body) {
              body = {};
            }
            if (!body.error) {
              body.error = {
                message: 'HTTP Response: ' + res.statusCode
              };
            }
          }
          callback(body, res.statusCode);
        }
      });
      return res;
    });
    req.write(data);
    return req.end();
  };

  return AlgorithmiaClient;

})();

algorithmia = {
  apiKey: null,
  apiAddress: defaultApiAddress,
  client: function(key, address) {
    return new AlgorithmiaClient(key || this.apiKey, address || this.apiAddress);
  },
  algo: function(path) {
    this.defaultClient = this.defaultClient || new AlgorithmiaClient(apiKey, apiAddress);
    return this.defaultClient.algo(path);
  },
  file: function(path) {
    this.defaultClient = this.defaultClient || new AlgorithmiaClient(apiKey, apiAddress);
    return this.defaultClient.algo(path);
  }
};

module.exports = exports = algorithmia;
