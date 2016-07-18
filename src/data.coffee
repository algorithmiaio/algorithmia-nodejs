#
# Data.coffee
#
path = require('path')
fs = require('fs')

class Data
  constructor: (client, path) ->
    @client = client
    @data_path = path.replace /data\:\/\//, ''

  basename: () ->
    @data_path.slice(@data_path.lastIndexOf('/')+1)

  parent: () ->
    offset = @data_path.lastIndexOf('/')
    if offset>=0 then new Dir(@client, 'data://' + @data_path.slice(0,offset)) else null


#
# File objects in the Algorithmia Data API
#
class File extends Data

  # put any content
  put: (content, callback) ->
    headers =
      'Content-Type': null
    @client.req('/v1/data/' + @data_path, 'PUT', content, headers, callback)

  # download file
  get: (callback) ->
    headers =
      'Accept': 'application/octet-stream'
    innerCb = (response, status) ->
      err = if (typeof response == 'object' && response?.error) then response.error else null
      data = if (err == null) then response else null
      callback(err, data)

    @client.req('/v1/data/' + @data_path, 'GET', '', headers, innerCb)

  # deprecated. use `put(content, callback)` instead
  putString: (content, callback) ->
    headers =
      'Content-Type': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'PUT', content, headers, callback)

  # deprecated. use `put(JSON.stringify(content), callback)` instead
  putJson: (content, callback) ->
    headers =
      'Content-Type': 'application/json'
    @client.req('/v1/data/' + @data_path, 'PUT', content, headers, callback)

  # deprecated. use `get(function(err, data){...})` instead
  getString: (callback) ->
    headers =
      'Accept': 'text/plain'
      'Content-Type': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'GET', '', headers, callback)

  # deprecated. use `get(function(err, data){ var obj = JSON.parse(data) })`
  getJson: (callback) ->
    headers =
      'Accept': 'application/json'
      'Content-Type': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'GET', '', headers, callback)

  exists: (callback) ->
    headers =
      'Content-Type': 'text/plain'
      'Accept': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'HEAD', '', headers, (response, status) ->
      if status == 200 then callback(true) else callback(false, status, response)
    )

  delete: (callback) ->
    headers =
      'Content-Type': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'DELETE', '', headers, callback)

#
# Dir objects in the Algorithmia Data API
#
class Dir extends Data
  create: (callback) ->
    content =
        name: @basename()
    @client.req('/v1/data/' + @parent().data_path, 'POST', JSON.stringify(content), headers, callback)

  file: (filename) ->
    new File(@client, 'data://' + @data_path + '/' + filename)

  putFile: (filePath, callback) ->
    filename = path.basename(filePath)
    fs.readFile(filePath, (err, data) =>
      @file(filename).put(data, callback)
    )

  iterator: () ->
    listing = new DirListing(@client, @data_path)
    listing.iterator()

  forEach: (callback) ->
    listing = new DirListing(@client, @data_path)
    listing.forEach(callback)

  forEachFile: (callback) ->
    listing = new DirListing(@client, @data_path)
    listing.forEach (err, item) ->
        if item instanceof File
            callback(err, item)

  forEachDir: (callback) ->
    listing = new DirListing(@client, @data_path)
    listing.forEach (err, item) ->
        if item instanceof Dir
            callback(err, item)

  exists: (callback) ->
    headers =
      'Content-Type': 'text/plain'
    @client.req('/v1/data/' + @data_path, 'GET', '', headers, (response, status) ->
      if status == 200 then callback(true) else callback(false, status, response)
    )

  delete: (force, callback) ->
    query = if force then '?force=true' else ''
    headers =
      'Content-Type': 'text/plain'
    @client.req('/v1/data/' + @data_path + query, 'DELETE', '', headers, callback)

#
# Helper class for working with directory listings
#
class DirListing
    constructor: (client, path) ->
        @client = client
        @data_path = path
        @offset = 0
        @error = null
        @page = null

    loadNextPage: (cb) ->
        headers =
            'Content-Type': 'text/plain'
        query = if @page == null then '' else "?marker=#{encodeURIComponent(@page.marker)}"
        @client.req('/v1/data/' + @data_path + query, 'GET', '', headers, (response, status) =>
            @offset = 0
            if status == 200
                @page = response
                @error = null
            else
                @page = null
                @error = response.error
            cb() if cb
        )

    forEach: (cb) ->
        thenCb = null
        iter = @iterator()
        recurse = (err, value) ->
            if value == undefined
                thenCb() if thenCb
            else
                cb(err, value)
                iter.next(recurse)
        iter.next(recurse)
        return { then: (cb) => thenCb = cb }

    iterator: ->
        next: (cb) =>
            if @error
                cb(@error, undefined)
            else if @page == null
                @loadNextPage( => @iterator().next(cb) )
            else
                dirCount = @page.folders?.length || 0
                fileCount = @page.files?.length || 0
                if @offset < dirCount
                    dir = @page.folders[@offset]
                    @offset++
                    cb(null, new Dir(@client, 'data://' + @data_path + '/' + dir.name))
                else if @offset < dirCount + fileCount
                    file = @page.files[@offset]
                    @offset++
                    nextResult = new File(@client, 'data://' + @data_path + '/' + file.filename)
                    # augment File with a few extra fields
                    nextResult.last_modified = file.last_modified
                    nextResult.size = file.size
                    cb(null, nextResult)
                else if @page.marker
                    @loadNextPage( => @iterator().next(cb) )
                else
                    cb(null, undefined)

            return


module.exports = exports =
    File: File
    Dir: Dir
