#
# Data.coffee
#

Data = require('./data.js')


class File extends Data
  # put string
  putString: (content, callback) ->
    headers =
      'Content-Type': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'PUT', content, headers, callback)

  # put json
  putJson: (content, callback) ->
    headers =
      'Content-Type': 'application/JSON'
    @client.req('/v1/data/' + @data_path, 'PUT', content, headers, callback)

  # get string
  getString: (callback) ->
    headers =
      'Accept': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'GET', '', headers, callback)

  # get json
  getJson: (callback) ->
    headers =
      'Accept': 'application/JSON'
    @client.req('/v1/data/' + @data_path, 'GET', '', headers, callback)


module.exports = exports = File