https = require('https')
url = require('url')

Algorithm = require('./algorithm.js')
Data = require('./data.js')

class AlgorithmiaClient
  constructor: (key) ->
    @api_path = 'https://api.algorithmia.com/v1/'

    if key.indexOf('Simple ') == 0
      @api_key = key
    else
      @api_key = 'Simple ' + key

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
      'Authorization': @api_key
      'User-Agent': 'NodeJS/' + process.version

    # merge default header with custom header
    for key,val of cheaders
      dheader[key] = val
    
    # make options
    options = url.parse(@api_path + path)
    options.method = method
    options.headers = dheader

    # trigger call
    req = https.request(options, (res) ->
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
          if res.statusCode != 200
            if !body
              body = {}
            if !body.error
              body.error = message: 'HTTP Response: ' + res.statusCode
          callback body
        return
      res
    )

    req.write data
    req.end()

# Factory method to avoid explicitly creating using the 'new' keyword
algorithmia = (key) ->
  new AlgorithmiaClient(key)

module.exports = exports = algorithmia
