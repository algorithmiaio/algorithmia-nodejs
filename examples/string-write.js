/*
	string-wirte.js

	Example shows how to create/update a string file using Algorithmia's DataAPI.
	The below example will create the file if it does not already exist, and update
	it if it's already there.
*/

var algorithmia = require("../lib/algorithmia.js");
var client = algorithmia.client(process.env.ALGORITHMIA_API_KEY);

// === Create/Update file
var content = "Hello this is a test";
var f = client.file("data://.my/TestCollection/foo.txt");

var writeFile = function() {
    console.log("Writing file...")
    f.put(content, function(response) {
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

        // It's not necessary to check if a file exists if you want to blindly overwrite it
        // but this is exercising a bit more surface area of the client
        f.exists(function(exists, fileStatus, fileResponse) {
            if(exists) {
                console.log("Explicitly deleting existing file...");
                f.delete(function(response, status) {
                    if(response.error) {
                        console.log("Error deleting file. Will ignore and overwrite it anyway...")
                    } else {
                        console.log("Successfully deleted file. Ready to write new file...")
                    }
                    writeFile();
                });
            } else {
                writeFile();
            }
        });
    }

});




