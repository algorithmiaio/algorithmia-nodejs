var Algorithm, AlgorithmiaClient, Data, algorithmia, defaultApiAddress, exports, http, https, url;

https = require('https');

http = require('http');

url = require('url');

Algorithm = require('./algorithm.js');

Data = require('./data.js');

defaultApiAddress = 'https://api.algorithmia.com/v1/';

AlgorithmiaClient = (function() {
  function AlgorithmiaClient(key, address) {
    this.apiAddress = address || process.env.ALGORITHMIA_API || defaultApiAddress;
    key = key || process.env.ALGORITHMIA_API_KEY;
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
    var dheader, httpRequest, key, options, protocol, val;
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
    protocol = options.protocol === "https:" ? https : http;
    httpRequest = protocol.request(options, function(res) {
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
    httpRequest.write(data);
    httpRequest.end();
  };

  return AlgorithmiaClient;

})();

algorithmia = {
  client: function(key, address) {
    return new AlgorithmiaClient(key, address);
  },
  algo: function(path) {
    this.defaultClient = this.defaultClient || new AlgorithmiaClient();
    return this.defaultClient.algo(path);
  },
  file: function(path) {
    this.defaultClient = this.defaultClient || new AlgorithmiaClient();
    return this.defaultClient.algo(path);
  }
};

module.exports = exports = algorithmia;
