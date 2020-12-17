/*
    addone.js

    Simple example showing how to call Algorithmia and pass a premitive value input.
*/

var algorithmia = require("../lib/algorithmia.js");

var client = algorithmia.client(process.env.ALGORITHMIA_API_KEY);
var input = 5;

client.algo("docs/JavaAddOne").pipe(input).then(function(response) {
    if(response.error) {
        console.log("Error: " + response.error.message);
    } else {
        console.log(response.get());
    }
});