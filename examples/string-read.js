/*
	string-read.js

	Example shows how to read a string file using Algorithmia's DataAPI.

	**Note** that the code will fail if the collection 'TestCollection' does not already exist.
*/

var algorithmia = require("../lib/algorithmia.js");
var client = algorithmia.client(process.env.ALGORITHMIA_API_KEY);


client.file("data://.my/TestCollection/foo.txt").get(function(err, response) {
	if(err) {
		return console.log("ERROR: " + err.message);
	}
	console.log(response);
});

