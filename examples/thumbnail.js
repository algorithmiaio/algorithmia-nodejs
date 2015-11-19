/*
    thumbnail.js

    Example shows how to call Algorithmia with binary data (e.g. an image) by callin .pipe() with a Buffer

*/

var algorithmia = require("../lib/algorithmia.js"),
    fs = require("fs");

var client = algorithmia(process.env.ALGORITHMIA_API_KEY);

var image = __dirname+"/theoffice.jpg";
var buffer = fs.readFileSync(image);

client.algo("opencv/SmartThumbnail").pipe(buffer).then(function(output) {
    if(output.error) {
        console.log("ERROR: " + output.error.message);
    } else {
        console.log(output.result);
    }
});