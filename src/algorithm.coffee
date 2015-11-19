#
#  Algorithm.coffee
#

class Algorithm
  constructor: (client, path) ->
    @client = client
    @algo_path = path

  # pipe
  pipe: (input) ->
    data = input

    if Buffer.isBuffer(input)
      contentType = "application/octet-stream"
    else if typeof input == "string"
      try
        contentType = "application/json"
      catch
        contentType = "plain/text"
    else
      contentType = "application/json"
      data = JSON.stringify(input)

    @req = @client.req(
      'algo/' + @algo_path,
      'POST',
      data,
      {'Content-Type': contentType},
      (body) => @callback(body)
    )

    this

  # then
  then: (callback) ->
    @callback = callback

module.exports = exports = Algorithm