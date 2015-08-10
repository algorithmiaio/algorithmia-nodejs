var Algorithm, AlgorithmiaClient, Data, algorithmia, exports, https, url;

https = require('https');

url = require('url');

Algorithm = require('./algorithm.js');

Data = require('./data.js');

AlgorithmiaClient = (function() {
  function AlgorithmiaClient(key) {
    this.api_path = 'https://api.algorithmia.com/v1/';
    if (key.indexOf('Simple ') === 0) {
      this.api_key = key;
    } else {
      this.api_key = 'Simple ' + key;
    }
  }

  AlgorithmiaClient.prototype.algo = function(path) {
    return new Algorithm(this, path);
  };

  AlgorithmiaClient.prototype.file = function(path) {
    return new Data(this, path);
  };

  AlgorithmiaClient.prototype.req = function(path, method, data, cheaders, callback) {
    var dheader, key, options, req, val;
    dheader = {
      'Content-Type': 'application/JSON',
      'Accept': 'application/JSON',
      'Authorization': this.api_key,
      'User-Agent': 'NodeJS/' + process.version
    };
    for (key in cheaders) {
      val = cheaders[key];
      dheader[key] = val;
    }
    options = url.parse(this.api_path + path);
    options.method = method;
    options.headers = dheader;
    req = https.request(options, function(res) {
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
          if (res.statusCode !== 200) {
            if (!body) {
              body = {};
            }
            if (!body.error) {
              body.error = {
                message: 'HTTP Response: ' + res.statusCode
              };
            }
          }
          callback(body);
        }
      });
      return res;
    });
    req.write(data);
    return req.end();
  };

  return AlgorithmiaClient;

})();

algorithmia = function(key) {
  return new AlgorithmiaClient(key);
};

module.exports = exports = algorithmia;
