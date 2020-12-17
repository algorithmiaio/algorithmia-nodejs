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
var d = client.dir("data://.my/TestCollection");
var imageIn = __dirname+"/theoffice.jpg";

var writeFile = function() {
    console.log("Writing file...")
    d.putFile(imageIn, function(response) {
        console.log(response);
    });
};

// Check if parent directory exists
d.exists(function(dirExists, dirStatus, dirResponse) {
    if(!dirExists) {
        console.log("Creating directory: " + d.data_path);
        d.parent().create(function() {
            writeFile();
        });
    } else {
        writeFile();
    }
});




