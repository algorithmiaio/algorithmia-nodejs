/*
	addone.js
	
	Simple example showing how to call Algorithmia and pass a premitive value input.
*/

var algorithmia = require("../lib/algorithmia.js");

var client = algorithmia(process.env.ALGORITHMIA_API_KEY);
var input = "5";

client.algo("docs/JavaAddOne").pipe(input).then(function(output) {
	console.log(output.result);
});