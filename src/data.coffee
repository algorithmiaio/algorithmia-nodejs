#
# Data.coffee
#

class Data
  constructor: (client, path) ->
    @client = client

    if (path.indexOf("data://") != 0)
      throw "Supplied path is invalid."

    @data_path = path.replace /data\:\/\//, ""

  # put string
  putString: (content, callback) ->
    headers = 
      'Content-Type': 'text/plain'
    @client.req('data/' + @data_path, 'PUT', content, headers, callback)

  # put json
  putJson: (content, callback) ->
    headers = 
      'Content-Type': 'application/JSON'
    @client.req('data/' + @data_path, 'PUT', content, headers, callback)

  # get string
  getString: (callback) ->
    headers = 
      'Accept': 'text/plain'
    @client.req('data/' + @data_path, 'GET', "", headers, callback)

  # get json
  getJson: (callback) ->
    headers = 
      'Accept': 'text/plain'
    @client.req('data/' + @data_path, 'GET', "", headers, callback)

module.exports = exports = Data