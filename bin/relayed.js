#!/usr/bin/env node

var http    = require('http'),
    url     = require('url');

http.createServer(function (request, response) {

    // Passed in variables from the Shell script.
    var targetUrl   = process.argv[2],
        targetPort  = process.argv[3],
        parsedUrl   = url.parse(targetUrl);

    // Determine whether to use HTTP or HTTPS for the relay.
    var transport   = parsedUrl.protocol === 'https:' ? require('https') : require('http');

    if (parsedUrl.protocol === 'https:') {
        // Process all HTTPS requests irrespective of certificates!
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    }

    var headers     = request.headers;
    headers.host    = parsedUrl.host;

    var relayedRequest = transport.request({

        host:       headers.host,
        port:       targetPort,
        path:       request.url,
        method:     request.method,
        headers:    headers

    }, function(relayedResponse) {

        response.writeHead(relayedResponse.statusCode, relayedResponse.headers);

        relayedResponse.on('data', function (data) {
            response.write(data);
        });

        relayedResponse.on('end', function () {
            response.end();
        });

    });

    request.on('data', function (d) {
        relayedRequest.write(d);
    });

    request.on('end', function () {
        relayedRequest.end();
    });

}).listen(8910, '127.0.0.1');