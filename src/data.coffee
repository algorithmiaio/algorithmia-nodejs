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
    i = @data_path.lastIndexOf('/')
    if i>=0 then new Dir(@client, 'data://' + @data_path.slice(0,i)) else null


module.exports = exports = Data
Dir = require('./dir.js') # Delay circular-reference init
