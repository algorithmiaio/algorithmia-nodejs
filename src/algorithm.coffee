#
#  Algorithm.coffee
#

class Algorithm
  constructor: (client, path) ->
    @client = client
    @algo_path = path
    @promise = { then: (callback) => @callback = callback }

  # pipe
  pipe: (input) ->
    data = input

    if Buffer.isBuffer(input)
      contentType = "application/octet-stream"
    else if typeof input == "string"
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

    @promise

  pipeJson: (input) ->
    if typeof input != "string"
      throw "Cannot convert #{typeof input} to string"

    @req = @client.req(
      'algo/' + @algo_path,
      'POST',
      input,
      {'Content-Type': "application/json"},
      (body) => @callback(body)
    )

    @promise



module.exports = exports = Algorithm