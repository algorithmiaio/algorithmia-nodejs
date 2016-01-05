var Data, Dir, exports;

Data = (function() {
  function Data(client, path) {
    this.client = client;
    if (path.indexOf('data://') !== 0) {
      throw 'Supplied path is invalid.';
    }
    this.data_path = path.replace(/data\:\/\//, '');
  }

  Data.prototype.basename = function() {
    return this.data_path.slice(this.data_path.lastIndexOf('/') + 1);
  };

  Data.prototype.parent = function() {
    var i;
    i = this.data_path.lastIndexOf('/');
    if (i >= 0) {
      return new Dir(this.client, 'data://' + this.data_path.slice(0, i));
    } else {
      return null;
    }
  };

  return Data;

})();

module.exports = exports = Data;

Dir = require('./dir.js');
