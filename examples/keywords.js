/*
	keywords.js

	Example shows how to call Algorithmia with multiple arguments. In this case, we're passing
	a set of documents (represented as array of strings) and a maximum number of keywords (re-
	presented as an integer). Notice how the two arguments are combined and passed as an array.

	See https://algorithmia.com/algorithms/nlp/KeywordsForDocumentSet
*/

var algorithmia = require("../lib/algorithmia.js");
var client = algorithmia(process.env.ALGORITHMIA_API_KEY);

var documents 	= ["badger badger buffalo mushroom mushroom mushroom mushroom mushroom mushroom mushroom","antelope buffalo mushroom","bannana"]
var maxKeywords = 2
var input 		= [documents, maxKeywords];

client.algo("nlp/KeywordsForDocumentSet").pipe(input).then(function(output) {

	if (output.error) {
		throw output.error.message;
    }

	console.log(output.result);
});