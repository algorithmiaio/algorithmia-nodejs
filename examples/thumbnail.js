/*
    thumbnail.js

    Example shows how to call Algorithmia with binary data (e.g. an image) by callin .pipe() with a Buffer

*/

var algorithmia = require("../lib/algorithmia.js"),
    fs = require("fs");

var client = algorithmia(process.env.ALGORITHMIA_API_KEY);

var image = __dirname+"/theoffice.jpg";
var buffer = fs.readFileSync(image);

client.algo("opencv/SmartThumbnail").pipe(buffer).then(function(response) {
    if(response.error) {
        console.log("ERROR: " + response.error.message);
        return;
    }

    var bufferOut = response.get();
    var thumbnailPath = __dirname+"/../tmp/theoffice_thumb.png";
    fs.writeFile(thumbnailPath, bufferOut, function(err) {
        if(err) {
            console.log("Error writing file: " + err);
        }
        console.log("Success: " + thumbnailPath);
    })

});