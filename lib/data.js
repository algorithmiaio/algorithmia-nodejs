var Data, exports;

Data = (function() {
  function Data(client, path) {
    this.client = client;
    if (path.indexOf("data://") !== 0) {
      throw "Supplied path is invalid.";
    }
    this.data_path = path.replace(/data\:\/\//, "");
  }

  Data.prototype.putString = function(content, callback) {
    var headers;
    headers = {
      'Content-Type': 'text/plain'
    };
    return this.client.req('data/' + this.data_path, 'PUT', content, headers, callback);
  };

  Data.prototype.putJson = function(content, callback) {
    var headers;
    headers = {
      'Content-Type': 'application/JSON'
    };
    return this.client.req('data/' + this.data_path, 'PUT', content, headers, callback);
  };

  Data.prototype.getString = function(callback) {
    var headers;
    headers = {
      'Accept': 'text/plain'
    };
    return this.client.req('data/' + this.data_path, 'GET', "", headers, callback);
  };

  Data.prototype.getJson = function(callback) {
    var headers;
    headers = {
      'Accept': 'text/plain'
    };
    return this.client.req('data/' + this.data_path, 'GET', "", headers, callback);
  };

  return Data;

})();

module.exports = exports = Data;
