http  = require('http')
https = require('https')
url   = require('url')


algorithmia =
    apiAddress: "https://api.algorithmia.com"

    setApiKey: (apiKey) ->
        algorithmia.apiKey = apiKey

    exec: (algo, data) ->
        successCb = (result, duration) -> console.log("Not handling success")
        errorCb = (statusCode, err, stacktrace) -> console.log("Not handling error")

        options = url.parse("#{algorithmia.apiAddress}/api/#{algo}")
        options.method = 'POST'
        options.headers ||= {}
        options.headers['Accept'] = 'application/json'
        options.headers['User-Agent'] = "NodeJS/#{process.version} (algorithmia.js)"

        if algorithmia.apiKey
            options.headers['Authorization'] = algorithmia.apiKey
        else
            console.log("WARNING: API Key not set")

        if typeof data == 'object'
            options.headers['Content-Type'] = 'application/json'
            sendData = JSON.stringify(data)
        else
            sendData = ''+data

        transport = if options.protocol == "https:" then https else http
        req = transport.request(options, (res) ->
            res.setEncoding('utf8')
            chunks = []

            res.on('data', (chunk) -> chunks.push(chunk))
            res.on('end', () ->
                json = chunks.join('')
                body = JSON.parse(json)

                if res.statusCode != 200 || body.error
                    errorCb(body?.error, res.statusCode, body?.stacktrace)
                else
                    successCb(body.result, body.duration)
            )
        )

        req.write(sendData)
        req.end()

        chain =
            success: (cb) -> successCb = cb
            error: (cb) -> errorCb = cb

module.exports = exports = algorithmia
