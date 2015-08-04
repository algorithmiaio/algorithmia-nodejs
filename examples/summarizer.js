/*
	summarizer.js

	Example shows how to call Algorithmia twice:
		- Get the main text of a page (Url2Text)
		- Get the summary of a piece of text (Summarize)
*/

var algorithmia = require("../lib/algorithmia.js");
var client = algorithmia(process.env.ALGORITHMIA_API_KEY);

var url = "http://www.paulgraham.com/hp.html";

client.algo("util/Url2Text").pipe(url).then(function(output) {

	if (output.error) {
		throw output.error.message;
	}

	var text = output.result;

	client.algo("nlp/Summarizer").pipe(text).then(function(output) {
		console.log(output.result);
	});
});