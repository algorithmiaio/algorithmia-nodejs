https = require('https')
http = require('http')
url = require('url')

Algorithm = require('./algorithm.js')
Data = require('./data.js')

defaultApiAddress = 'https://api.algorithmia.com/v1/'

class AlgorithmiaClient
  constructor: (key, address) ->
    @apiAddress = address || defaultApiAddress

    if key
      if key.indexOf('Simple ') == 0
        @apiKey = key
      else
        @apiKey = 'Simple ' + key
    else
      @apiKey = ''

  # algo
  algo: (path) ->
    new Algorithm(this, path)

  # file
  file: (path) ->
    new Data(this, path)

  # internal http-helper
  req: (path, method, data, cheaders, callback) ->

    # default header
    dheader =
      'Content-Type': 'application/JSON'
      'Accept': 'application/JSON'
      'Authorization': @apiKey
      'User-Agent': 'NodeJS/' + process.version

    # merge default header with custom header
    for key,val of cheaders
      dheader[key] = val

    # make options
    options = url.parse(@apiAddress + path)
    options.method = method
    options.headers = dheader

    # helper method to switch between http / https
    request = (options, cb) ->
      if options.protocol == "https:"
        https.request(options, cb)
      else if options.protocol == "http:"
        http.request(options, cb)
      else
        console.error("Invalid api address " + options.path)

    # trigger call
    req = request(options, (res) ->
      res.setEncoding 'utf8'
      chunks = []

      res.on 'data', (chunk) ->
        chunks.push chunk

      res.on 'end', ->
        buff = chunks.join('')

        if (dheader['Accept'] == 'application/JSON')
          body = JSON.parse(buff)
        else
          body = buff

        if callback
          if res.statusCode < 200 || res.statusCode >= 300
            if !body
              body = {}
            if !body.error
              body.error = message: 'HTTP Response: ' + res.statusCode
          callback body, res.statusCode
        return
      res
    )

    req.write data
    req.end()

algorithmia = {
  # default api key and address
  apiKey: null
  apiAddress: defaultApiAddress

  client: (key, address) ->
    new AlgorithmiaClient(key || @apiKey, address || @apiAddress)

  # Convinience methods to use default client
  algo: (path) ->
    @defaultClient = @defaultClient || new AlgorithmiaClient(apiKey, apiAddress)
    @defaultClient.algo(path)

  file: (path) ->
    @defaultClient = @defaultClient || new AlgorithmiaClient(apiKey, apiAddress)
    @defaultClient.algo(path)
}

module.exports = exports = algorithmia
