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
      contentType = 'application/octet-stream'
    else if typeof input == 'string'
      contentType = 'text/plain'
    else
      contentType = 'application/json'
      data = JSON.stringify(input)

    @req = @client.req(
      '/v1/algo/' + @algo_path,
      'POST',
      data,
      {'Content-Type': contentType},
      (response, status) => @callback(new AlgoResponse(response, status))
    )

    @promise

  pipeJson: (input) ->
    if typeof input != 'string'
      throw "Cannot convert #{typeof input} to string"

    @req = @client.req(
      '/v1/algo/' + @algo_path,
      'POST',
      input,
      {'Content-Type': 'application/json'},
      (response, status) => @callback(new AlgoResponse(response, status))
    )

    @promise

class AlgoResponse
  constructor: (response, status) ->
    @status = status
    @result = response.result
    @error = response.error
    @metadata = response.metadata

  get: ->
    throw "#{@error.message}" if @error

    switch @metadata.content_type
      when "void"
        return null
      when "text", "json"
        # response was already parsed,
        # so response.result is good for both text and json types
        return @result
      when "binary"
        return new Buffer(@result, 'base64')
      else
        throw "Unknown result content_type: #{@metadata.content_type}."


module.exports = exports = Algorithm