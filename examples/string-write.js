/*
	string-wirte.js
	
	Example shows how to create/update a string file using Algorithmia's DataAPI.
	The below example will create the file if it does not already exist, and update
	it if it's already there.

	**Note** that the code will fail if the collection 'TestCollection' does not already exist.
*/

var algorithmia = require("../lib/algorithmia.js");
var client = algorithmia(process.env.ALGORITHMIA_API_KEY);

// === Create/Update file
var content = "Hello this is a test";
client.file("data://.my/TestCollection/foo.txt").putString(content, function(output) {
	console.log(output);
});

