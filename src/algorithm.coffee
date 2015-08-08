#
#  Algorithm.coffee
#

class Algorithm
  constructor: (client, path) ->
    @client = client
    @algo_path = path

  # pipe
  pipe: (params) ->
    @algo_params = params

    if typeof params == 'object' or typeof params == 'string'
      @algo_data = JSON.stringify(params)
    else
      @algo_data = params + ''
    
    this

  # then
  then: (callback) ->
    @client.req('algo/' + @algo_path, 'POST', @algo_data, {}, callback)

module.exports = exports = Algorithm