/**
 * Algorithmia Lambda Function
 *
 * Calls any algorithm in the Algorithmia marketplace
 * Get an API key and free credits by creating an account at algorithmia.com
 * For more documentation see: algorithmia.com/developers/clients/lambda
 */

var algorithmia = require("algorithmia");
var AWS = require('aws-sdk');
var apiKey;

// Provide your Algorithmia API key
apiKey= "<YourApiKey>";

/*
 * This is the lambda entrypoint (no modification necessary)
 *   it ensures apiKey is set
 *   and then calls processEvent with the same event and context
 */
exports.handler = function(event, context) {
    if(apiKey) {
        processEvent(event, context);
    } else {
        context.fail("API Key has not been set.")
    }
};


/*
 * Configure your function to interact
*/
var processEvent = function(event, context) {
    /*
     * Step 1: Set the algorithm you want to call
     *  This may be any algorithm in the Algorithmia marketplace
    */
    var algorithm = "algo://demo/Hello"; // algorithmia.com/algorithms/demo/Hello

    /*
     * Step 2: Use your event source to set inputData according to the algorithm's input format
     *         This demo example uses the S3 Object's name as inputData
     */
    var inputData = event.Records[0].s3.object.key; // Example for algo://demo/Hello

    /*  Advanced example:
     *      Create 200x50 thumbnails for S3 file events using algo://opencv/SmartThumbnail
     *          Algorithm expects input as [URL, WIDTH, HEIGHT]
     *          Output is a base64 encoding of the resulting PNG thumbnail
     *
     *      var algorithm = "algo://opencv/SmartThumbnail"
     *      var s3 = new AWS.S3();
     *      var bucket = event.Records[0].s3.bucket.name;
     *      var key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " ")) ;
     *      var params = {Bucket: bucket, Key: key};
     *      var signedUrl = s3.getSignedUrl('getObject', params);
     *      var inputData = [signedUrl, 200, 50];
     */

    // Run the algorithm
    var client = algorithmia(apiKey);
    client.algo(algorithm).pipe(inputData).then(function(output) {
        if(output.error) {
            console.log("Error: " + output.error.message);
            context.fail(output.error.message);
        } else {
            /*
             * Step 3: Process the algorithm output here
             *         This demo example prints and succeeds with the algorithm result
             */
            console.log(output);
            context.succeed(output.result);
        }
    });
}
