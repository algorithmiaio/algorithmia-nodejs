Data = require('./data.js')

class Dir extends Data
  create: (callback) ->
    content =
        name: @basename()
    headers =
      'Accept': 'text/plain'
    @client.req('/v1/data/' + @parent().data_path, 'POST', JSON.stringify(content), headers, callback)

  exists: (callback) ->
    headers =
      'Content-Type': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'GET', '', headers, (response, status) ->
      if status == 200 then callback(true) else callback(false, status, response)
    )

  delete: (force, callback) ->
    query = if force then '?force=true' else ''
    headers =
      'Content-Type': 'text/plain'
    @client.req('/v1/data/' + @data_path + query, 'DELETE', '', headers, callback)

module.exports = exports = Dir