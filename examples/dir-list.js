/*
	dir-list.js

	Example shows how to iterate over contents of a directory using Algorithmia's DataAPI.

*/

var algorithmia = require("../lib/algorithmia.js");
var client = algorithmia.client(process.env.ALGORITHMIA_API_KEY);

console.log("Listing collection...")
client.dir("data://.my/TestCollection").forEach(function(err, item) {
    if(err) {
        return console.log("Error: " + JSON.stringify(err));
    }

    console.log(item.data_path);
}).then(function() {
    console.log("Finished listing collection");
});

