var Data, File, exports,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Data = require('./data.js');

File = (function(superClass) {
  extend(File, superClass);

  function File() {
    return File.__super__.constructor.apply(this, arguments);
  }

  File.prototype.putString = function(content, callback) {
    var headers;
    headers = {
      'Content-Type': 'text/plain'
    };
    return this.client.req('/v1/data/' + this.data_path, 'PUT', content, headers, callback);
  };

  File.prototype.putJson = function(content, callback) {
    var headers;
    headers = {
      'Content-Type': 'application/JSON'
    };
    return this.client.req('/v1/data/' + this.data_path, 'PUT', content, headers, callback);
  };

  File.prototype.getString = function(callback) {
    var headers;
    headers = {
      'Accept': 'text/plain'
    };
    return this.client.req('/v1/data/' + this.data_path, 'GET', '', headers, callback);
  };

  File.prototype.getJson = function(callback) {
    var headers;
    headers = {
      'Accept': 'application/JSON'
    };
    return this.client.req('/v1/data/' + this.data_path, 'GET', '', headers, callback);
  };

  return File;

})(Data);

module.exports = exports = File;
