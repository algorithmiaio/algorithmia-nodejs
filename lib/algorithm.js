var Algorithm, exports;

Algorithm = (function() {
  function Algorithm(client, path) {
    this.client = client;
    this.algo_path = path;
  }

  Algorithm.prototype.pipe = function(input) {
    var contentType, data;
    data = input;
    if (Buffer.isBuffer(input)) {
      contentType = "application/octet-stream";
    } else if (typeof input === "string") {
      contentType = "plain/text";
    } else {
      contentType = "application/json";
      data = JSON.stringify(input);
    }
    this.req = this.client.req('algo/' + this.algo_path, 'POST', data, {
      'Content-Type': contentType
    }, (function(_this) {
      return function(body) {
        return _this.callback(body);
      };
    })(this));
    return this;
  };

  Algorithm.prototype.pipeJson = function(input) {
    if (typeof input !== "string") {
      throw "Cannot convert " + (typeof input) + " to string";
    }
    this.req = this.client.req('algo/' + this.algo_path, 'POST', input, {
      'Content-Type': "application/json"
    }, (function(_this) {
      return function(body) {
        return _this.callback(body);
      };
    })(this));
    return this;
  };

  Algorithm.prototype.then = function(callback) {
    return this.callback = callback;
  };

  return Algorithm;

})();

module.exports = exports = Algorithm;
