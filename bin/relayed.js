#!/usr/bin/env node
(function Relayed($host, $port) {

    var http    = require('http'),
        url     = require('url');

    http.createServer(function (request, response) {

        // Set all of the necessary headers for CORS support.
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        response.setHeader('Access-Control-Allow-Credentials', true);

        // Passed in variables from the Shell script.
        var targetUrl  = process.argv[2],
            targetPort = process.argv[3],
            parsedUrl  = url.parse(targetUrl);

        // Determine whether to use HTTP or HTTPS for the relay.
        var transport = parsedUrl.protocol === 'https:' ? require('https') : require('http');

        if (parsedUrl.protocol === 'https:') {

            // Process all HTTPS requests irrespective of certificates!
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

        }

        var headers  = request.headers;
        headers.host = parsedUrl.host;

        /**
         * @property relayedRequest
         * @type {Object}
         */
        var relayedRequest = transport.request({

            host:    headers.host,
            port:    targetPort,
            path:    request.url,
            method:  request.method,
            headers: headers

        }, function(relayedResponse) {

            response.writeHead(relayedResponse.statusCode, relayedResponse.headers);

            relayedResponse.on('data', function onData(response) {
                response.write(response);
            });

            relayedResponse.on('end', function onEnd() {
                response.end();
            });

        });

        request.on('data', function onData(response) {
            relayedRequest.write(response);
        });

        request.on('end', function onEnd() {
            relayedRequest.end();
        });

    }).listen($port, $host);

})('127.0.0.1', 8910);