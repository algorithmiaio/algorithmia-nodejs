/*
    thumbnail.js

    Example shows how to call Algorithmia with binary data (e.g. an image) by callin .pipe() with a Buffer

*/

var algorithmia = require("../lib/algorithmia.js"),
    fs = require("fs");

var client = algorithmia.client(process.env.ALGORITHMIA_API_KEY);

var imageIn = __dirname+"/theoffice.jpg";
var imageOut = __dirname+"/../tmp/theoffice_thumb.png";

var buffer = fs.readFileSync(imageIn);

client.algo("opencv/SmartThumbnail").pipe(buffer).then(function(response) {
    if(response.error) {
        return console.log("Error: " + response.error.message);
    }

    fs.writeFile(imageOut, response.get(), function(err) {
        if(err) {
            console.log("Error writing file: " + err);
        }
        console.log("Success: " + imageOut);
    })

});