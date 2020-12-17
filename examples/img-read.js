/*
	img-read.js

	Example shows how to read a binary file using Algorithmia's DataAPI.

	**Note** that the code will fail if the collection 'TestCollection' does not already exist.
*/

var algorithmia = require("../lib/algorithmia.js"),
    fs = require("fs");

var client = algorithmia.client(process.env.ALGORITHMIA_API_KEY);

client.file("data://.my/TestCollection/theoffice.jpg").get(function(err, data) {
    if(err) {
        console.log(err)
        return console.log(err.message);
    }
    console.log("Received " + data.length + " bytes.");
    fs.writeFileSync("/tmp/theoffice.jpg", data);
    console.log("Finished reading to /tmp/theoffice.jpg");
});

