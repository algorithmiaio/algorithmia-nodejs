/*
	string-read.js
	
	Example shows how to read a string file using Algorithmia's DataAPI.
	
	**Note** that the code will fail if the collection 'TestCollection' does not already exist.
*/

var algorithmia = require("../lib/algorithmia.js");
var client = algorithmia(process.env.ALGORITHMIA_API_KEY);

// === Create/Update file
client.file("data://.my/TestCollection/foo.txt").getString(function(output) {
	console.log(output);
});

