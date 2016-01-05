#
# Data.coffee
#

# Dir = require('./dir.js')

class Data
  constructor: (client, path) ->
    @client = client

    if (path.indexOf('data://') != 0)
      throw 'Supplied path is invalid.'

    @data_path = path.replace /data\:\/\//, ''

  basename: () ->
    @data_path.slice(@data_path.lastIndexOf('/')+1)

  parent: () ->
    offset = @data_path.lastIndexOf('/')
    if offset>=0 then new Dir(@client, 'data://' + @data_path.slice(0,offset)) else null


module.exports = exports = Data
Dir = require('./dir.js') # Delay circular-reference init
