var Data, Dir, exports,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Data = require('./data.js');

Dir = (function(superClass) {
  extend(Dir, superClass);

  function Dir() {
    return Dir.__super__.constructor.apply(this, arguments);
  }

  Dir.prototype.create = function(callback) {
    var content, headers;
    content = {
      name: this.basename()
    };
    headers = {
      'Accept': 'text/plain'
    };
    return this.client.req('/v1/data/' + this.parent().data_path, 'POST', JSON.stringify(content), headers, callback);
  };

  Dir.prototype.exists = function(callback) {
    var headers;
    headers = {
      'Content-Type': 'text/plain'
    };
    return this.client.req('/v1/data/' + this.data_path, 'GET', '', headers, function(response, status) {
      if (status === 200) {
        return callback(true);
      } else {
        return callback(false, status, response);
      }
    });
  };

  Dir.prototype["delete"] = function(force, callback) {
    var headers, query;
    query = force ? '?force=true' : '';
    headers = {
      'Content-Type': 'text/plain'
    };
    return this.client.req('/v1/data/' + this.data_path + query, 'DELETE', '', headers, callback);
  };

  return Dir;

})(Data);

module.exports = exports = Dir;
