https = require('https')
http = require('http')
url = require('url')
packageJson = require('../package.json')

Algorithm = require('./algorithm.js')
Data = require('./data.js')

defaultApiAddress = 'https://api.algorithmia.com'

class AlgorithmiaClient
  constructor: (key, address) ->
    @apiAddress = address || process.env.ALGORITHMIA_API || defaultApiAddress

    key = key || process.env.ALGORITHMIA_API_KEY
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
    new Data.File(this, path)

  # dir
  dir: (path) ->
    new Data.Dir(this, path)

  # internal http-helper
  req: (path, method, data, cheaders, callback) ->

    # default header
    dheader =
      'Content-Type': 'application/json'
      'Accept': 'application/json'
      'User-Agent': 'algorithmia-nodejs/' + packageJson.version + ' (NodeJS ' + process.version + ')'
    if @apiKey
      dheader['Authorization'] = @apiKey

    # merge default header with custom header
    for key,val of cheaders
      dheader[key] = val

    # make options
    options = url.parse(@apiAddress + path)
    options.method = method
    options.headers = dheader

    # helper method to switch between http / https
    protocol = if options.protocol == 'https:' then https else http

    # trigger call
    httpRequest = protocol.request(options, (res) ->
      accept = dheader['Accept']
      if accept == 'application/json' || accept == 'text/plain'
        res.setEncoding 'utf8'

      chunks = []

      res.on 'data', (chunk) ->
        chunks.push chunk

      res.on 'end', ->
        ct = res.headers['content-type'] || accept
        if ct.startsWith('application/json')
          buff = chunks.join('')
          body = if buff == '' then {} else JSON.parse(buff)
        else if ct.startsWith('text/plain')
          body = chunks.join('')
        else
          body = Buffer.concat(chunks)

        if callback
          if res.statusCode < 200 || res.statusCode >= 300
            if !body
              body = {}
            if !body.error
              if res.headers['x-error-message']
                body.error = message: res.headers['x-error-message']
              else
                body.error = message: 'HTTP Response: ' + res.statusCode
          callback body, res.statusCode
        return
      res
    )
    if options.method != 'HEAD'
      httpRequest.write data
    httpRequest.end()
    return

algorithmia = (key,address) -> new AlgorithmiaClient(key, address)
algorithmia.client = (key, address) ->
    new AlgorithmiaClient(key, address)

# Convenience methods to use default client
algorithmia.algo = (path) ->
    @defaultClient = @defaultClient || new AlgorithmiaClient()
    @defaultClient.algo(path)
algorithmia.file = (path) ->
    @defaultClient = @defaultClient || new AlgorithmiaClient()
    @defaultClient.file(path)

module.exports = exports = algorithmia
