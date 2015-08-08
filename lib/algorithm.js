var Algorithm, exports;

Algorithm = (function() {
  function Algorithm(client, path) {
    this.client = client;
    this.algo_path = path;
  }

  Algorithm.prototype.pipe = function(params) {
    this.algo_params = params;
    if (typeof params === 'object' || typeof params === 'string') {
      this.algo_data = JSON.stringify(params);
    } else {
      this.algo_data = params + '';
    }
    return this;
  };

  Algorithm.prototype.then = function(callback) {
    return this.client.req('algo/' + this.algo_path, 'POST', this.algo_data, {}, callback);
  };

  return Algorithm;

})();

module.exports = exports = Algorithm;
