/*
	facedetection.js

	Example shows how to call Algorithmia to process a base64 image. This script will:
		- Encode a local image to base64
		- Run the base64 representation through FaceDetection algorithm
		- Print results of detected faces
*/

var algorithmia = require("../lib/algorithmia.js"),
	fs = require("fs");

var client = algorithmia(process.env.ALGORITHMIA_API_KEY);

var image = __dirname+"/theoffice.jpg";
var buffer = fs.readFileSync(image).toString("base64");

client.algo("ANaimi/FaceDetection").pipe(buffer).then(function(output) {

	if (output.error) {
		throw output.error.message;
	}

	console.log(output.result);
});