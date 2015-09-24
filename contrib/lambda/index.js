var algorithmia = require("./algorithmia.js")

/**
 * Algorithmia Lambda Function
 *
 * Calls any algorithm in the Algorithmia marketplace
 *
 * Provide the following event data:
 *   event.algo:  The algorithm URI, e.g., algo://tags/AutoTagURL
 *   event.input: The algorithm input, e.g., https://www.algorithmia.com
 *   event.apiKey: Your Algorithmia API key (begins with "sim")
 *
 * Will succeed with the response body.
 */
exports.handler = function(event, context) {
    var client = algorithmia(event.apiKey);

    client.algo(event.algo)
        .pipe(event.input)
        .then(function(output) {
            if(output.error) {
                context.fail(output.error);
            } else {
                context.succeed(output);
            }
        });
};
