http = require('http')
https = require('https')
url = require('url')

algorithmia = (key) ->
  # construct a new client object
  client = new Object
  client.path = 'https://api.algorithmia.com/v1/algo/'

  # make sure key starts with Simple
  if key.indexOf('Simple ') == 0
    client.key = key
  else
    client.key = 'Simple ' + key

  client.algo = (name) ->
    @url = client.path + name
    this

  client.pipe = (params) ->
    @params = params
    if typeof params == 'object' or typeof params == 'string'
      @data = JSON.stringify(params)
    else
      @data = params + ''
    this

  client.then = (callback) ->
    # make options
    options = url.parse(@url)
    options.method = 'POST'
    options.headers =
      'Content-Type': 'application/json'
      'Accept': 'application/json'
      'Authorization': client.key
      'User-Agent': 'NodeJS/' + process.version

    # trigger call
    req = https.request(options, (res) ->
      res.setEncoding 'utf8'
      chunks = []
      res.on 'data', (chunk) ->
        chunks.push chunk
      res.on 'end', ->
        json = chunks.join('')
        body = JSON.parse(json)
        if callback
          if res.statusCode != 200
            if !body
              body = {}
            if !body.error
              body.error = message: 'HTTP Response: ' + res.statusCode
          callback body
        return
      res
    )
    req.write client.data
    req.end()
    this

  client

module.exports = exports = algorithmia
