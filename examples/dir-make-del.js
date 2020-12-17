/*
	dir-make-del.js

	Example shows how to create and delet a directory using Algorithmia's DataAPI.

*/

var algorithmia = require("../lib/algorithmia.js");
var client = algorithmia.client(process.env.ALGORITHMIA_API_KEY);

console.log("Creating directory...");
var testDir = client.dir("data://.my/node_client_test");
testDir.create(function(err) {
    if(err) {
        console.log("Error: " + JSON.stringify(err));
    } else {
        console.log("Create directory succeeded. Deleting directory...");
    }

    console.log("Deleting directory...");
    testDir.delete(function(err) {
        if(err) {
            return console.log("Error: " + JSON.stringify(err));
        }
        console.log("Delete directory succeeded.");
    });
});

