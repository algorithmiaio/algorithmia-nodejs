/*
	image-write.js

	Example shows how to create/update a binary file using Algorithmia's DataAPI.
	The below example will create the file if it does not already exist, and update
	it if it's already there.
*/

var algorithmia = require("../lib/algorithmia.js"),
    fs = require("fs");

var client = algorithmia.client(process.env.ALGORITHMIA_API_KEY);

// === Create/Update file
var imageIn = __dirname+"/theoffice.jpg";
var buffer = fs.readFileSync(imageIn);
var f = client.file("data://.my/TestCollection/theoffice.jpg");

var writeFile = function() {
    console.log("Writing file...")
    f.put(buffer, function(response) {
        console.log(response);
    });
};

// Check if parent directory exists
f.parent().exists(function(dirExists, dirStatus, dirResponse) {
    if(!dirExists) {
        console.log("Creating directory: " + f.parent().data_path);
        f.parent().create(function() {
            writeFile();
        });
    } else {
        writeFile();
    }
});




