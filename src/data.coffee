#
# Data.coffee
#

class Data
  constructor: (client, path) ->
    @client = client

    if (path.indexOf('data://') != 0)
      throw 'Supplied path is invalid.'

    @data_path = path.replace /data\:\/\//, ''

  # This is similar to node's fs.exists function
  exists: (callback) ->
    headers =
      'Content-Type': 'text/plain'
      'Accept': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'HEAD', '', headers, (response, status) ->
      if status == 200 then callback(true) else callback(false)
    )

module.exports = exports = Data