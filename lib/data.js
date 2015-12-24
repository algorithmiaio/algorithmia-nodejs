var Data, exports;

Data = (function() {
  function Data(client, path) {
    this.client = client;
    if (path.indexOf('data://') !== 0) {
      throw 'Supplied path is invalid.';
    }
    this.data_path = path.replace(/data\:\/\//, '');
  }

  Data.prototype.exists = function(callback) {
    var headers;
    headers = {
      'Content-Type': 'text/plain',
      'Accept': 'text/plain'
    };
    return this.client.req('/v1/data/' + this.data_path, 'HEAD', '', headers, function(response, status) {
      if (status === 200) {
        return callback(true);
      } else {
        return callback(false);
      }
    });
  };

  return Data;

})();

module.exports = exports = Data;
