/**
 * Algorithmia Lambda Function
 *
 * Calls any algorithm in the Algorithmia marketplace
 * Get an API key and free credits by creating an account at algorithmia.com
 * For more documentation see: algorithmia.com/docs/clients/lambda
 *
 *
 * Follow these steps to encrypt your Algorithmia API Key for use in this function:
 *
 * 1. Create a KMS key - http://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html
 *
 * 2. Encrypt the event collector token using the AWS CLI
 *      aws kms encrypt --key-id alias/<KMS key name> --plaintext "<ALGORITHMIA_API_KEY>"
 *
 * 3. Copy the base-64 encoded, encrypted key (CiphertextBlob) to the kmsEncryptedApiKey variable
 *
 * 4. Give your function's role permission for the kms:Decrypt action.
 * Example:

{
    "Version": "2012-10-17",
    "Statement": [
    {
        "Sid": "Stmt1443036478000",
        "Effect": "Allow",
        "Action": [
            "kms:Decrypt"
            ],
        "Resource": [
            "<your KMS key ARN>"
            ]
    }
    ]
}
 */

var AWS = require('aws-sdk');
var apiKey, kmsEncryptedApiKey;

// Enter the base-64 encoded, encrypted key (CiphertextBlob)
kmsEncryptedApiKey = "<kmsEncryptedApiKey>";

/*
 * This is the lambda entrypoint (no modification necessary)
 *   it ensures apiKey is set (decrypting kmsEncryptedApiKey if provided)
 *   and then calls processEvent with the same event and context
 */
exports.handler = function(event, context) {
    if(kmsEncryptedApiKey && kmsEncryptedApiKey !== "<kmsEncryptedApiKey>") {
        var encryptedBuf = new Buffer(kmsEncryptedApiKey, 'base64');
        var cipherText = { CiphertextBlob: encryptedBuf };

        var kms = new AWS.KMS();
        kms.decrypt(cipherText, function(err, data) {
            if (err) {
                console.log("Decrypt error: " + err);
                context.fail(err);
            } else {
                apiKey = data.Plaintext.toString('ascii');
                processEvent(event, context);
            }
        });
    } else if(apiKey) {
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


/*
 * Algorithmia NodeJS SDK below
 */
var Algorithm, AlgorithmiaClient, AlgoResponse, Data, algorithmia, defaultApiAddress, http, https, packageJson, url;
https = require('https');
http = require('http');
url = require('url');

defaultApiAddress = 'https://api.algorithmia.com';

AlgorithmiaClient = (function() {
  function AlgorithmiaClient(key, address) {
    this.apiAddress = address || process.env.ALGORITHMIA_API || defaultApiAddress;
    key = key || process.env.ALGORITHMIA_API_KEY;
    if (key) {
      if (key.indexOf('Simple ') === 0) {
        this.apiKey = key;
      } else {
        this.apiKey = 'Simple ' + key;
      }
    } else {
      this.apiKey = '';
    }
  }

  AlgorithmiaClient.prototype.algo = function(path) {
    return new Algorithm(this, path);
  };

  AlgorithmiaClient.prototype.file = function(path) {
    return new Data(this, path);
  };

  AlgorithmiaClient.prototype.req = function(path, method, data, cheaders, callback) {
    var dheader, httpRequest, key, options, protocol, val;
    dheader = {
      'Content-Type': 'application/JSON',
      'Accept': 'application/JSON',
      'User-Agent': 'algorithmia-lambda/1.0.1 (NodeJS ' + process.version + ')'
    };
    if (this.apiKey) {
      dheader['Authorization'] = this.apiKey;
    }
    for (key in cheaders) {
      val = cheaders[key];
      dheader[key] = val;
    }
    options = url.parse(this.apiAddress + path);
    options.method = method;
    options.headers = dheader;
    protocol = options.protocol === 'https:' ? https : http;
    httpRequest = protocol.request(options, function(res) {
      var chunks;
      res.setEncoding('utf8');
      chunks = [];
      res.on('data', function(chunk) {
        return chunks.push(chunk);
      });
      res.on('end', function() {
        var body, buff;
        buff = chunks.join('');
        if (dheader['Accept'] === 'application/JSON') {
          body = JSON.parse(buff);
        } else {
          body = buff;
        }
        if (callback) {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            if (!body) {
              body = {};
            }
            if (!body.error) {
              body.error = {
                message: 'HTTP Response: ' + res.statusCode
              };
            }
          }
          callback(body, res.statusCode);
        }
      });
      return res;
    });
    httpRequest.write(data);
    httpRequest.end();
  };

  return AlgorithmiaClient;

})();

algorithmia = function(key, address) {
  return new AlgorithmiaClient(key, address);
};

algorithmia.client = function(key, address) {
  return new AlgorithmiaClient(key, address);
};

algorithmia.algo = function(path) {
  this.defaultClient = this.defaultClient || new AlgorithmiaClient();
  return this.defaultClient.algo(path);
};

algorithmia.file = function(path) {
  this.defaultClient = this.defaultClient || new AlgorithmiaClient();
  return this.defaultClient.file(path);
};


Algorithm = (function() {
  function Algorithm(client, path) {
    this.client = client;
    this.algo_path = path;
    this.promise = {
      then: (function(_this) {
        return function(callback) {
          return _this.callback = callback;
        };
      })(this)
    };
  }

  Algorithm.prototype.pipe = function(input) {
    var contentType, data;
    data = input;
    if (Buffer.isBuffer(input)) {
      contentType = 'application/octet-stream';
    } else if (typeof input === 'string') {
      contentType = 'text/plain';
    } else {
      contentType = 'application/json';
      data = JSON.stringify(input);
    }
    this.req = this.client.req('/v1/algo/' + this.algo_path, 'POST', data, {
      'Content-Type': contentType
    }, (function(_this) {
      return function(response, status) {
        return _this.callback(new AlgoResponse(response, status));
      };
    })(this));
    return this.promise;
  };

  Algorithm.prototype.pipeJson = function(input) {
    if (typeof input !== 'string') {
      throw "Cannot convert " + (typeof input) + " to string";
    }
    this.req = this.client.req('/v1/algo/' + this.algo_path, 'POST', input, {
      'Content-Type': 'application/json'
    }, (function(_this) {
      return function(response, status) {
        return _this.callback(new AlgoResponse(response, status));
      };
    })(this));
    return this.promise;
  };

  return Algorithm;

})();

AlgoResponse = (function() {
  function AlgoResponse(response, status) {
    this.status = status;
    this.result = response.result;
    this.error = response.error;
    this.metadata = response.metadata;
  }

  AlgoResponse.prototype.get = function() {
    if (this.error) {
      throw "" + this.error.message;
    }
    switch (this.metadata.content_type) {
      case "void":
        return null;
      case "text":
      case "json":
        return this.result;
      case "binary":
        return new Buffer(this.result, 'base64');
      default:
        throw "Unknown result content_type: " + this.metadata.content_type + ".";
    }
  };

  return AlgoResponse;

})();


Data = (function() {
  function Data(client, path) {
    this.client = client;
    if (path.indexOf('data://') !== 0) {
      throw 'Supplied path is invalid.';
    }
    this.data_path = path.replace(/data\:\/\//, '');
  }

  Data.prototype.putString = function(content, callback) {
    var headers;
    headers = {
      'Content-Type': 'text/plain'
    };
    return this.client.req('/v1/data/' + this.data_path, 'PUT', content, headers, callback);
  };

  Data.prototype.putJson = function(content, callback) {
    var headers;
    headers = {
      'Content-Type': 'application/JSON'
    };
    return this.client.req('/v1/data/' + this.data_path, 'PUT', content, headers, callback);
  };

  Data.prototype.getString = function(callback) {
    var headers;
    headers = {
      'Accept': 'text/plain'
    };
    return this.client.req('/v1/data/' + this.data_path, 'GET', '', headers, callback);
  };

  Data.prototype.getJson = function(callback) {
    var headers;
    headers = {
      'Accept': 'text/plain'
    };
    return this.client.req('/v1/data/' + this.data_path, 'GET', '', headers, callback);
  };

  return Data;

})();
