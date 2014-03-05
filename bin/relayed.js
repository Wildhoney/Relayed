#!/usr/bin/env node

/**
 * @module Relayed
 * @author Adam Timberlake
 */
(function Main($host, $port) {

    "use strict";

    // Usual includes.
    var http         = require('http'),
        url          = require('url'),
        childProcess = require('child_process'),
        args         = require('minimist')(process.argv.slice(2)),
        clc          = require('cli-color'),
        pad          = require('pad');

    /**
     * @property Relayed
     * @constructor
     */
    var Relayed = function Relayed() {

        // We're listening!
        this._outputMessage();
        this._outputMessage('Listening on ' + $host + ' port ' + $port, 97);
        this._outputMessage();

        // Initialise the server to listen for incoming requests.
        http.createServer(this._initialiseServer.bind(this)).listen($port, $host);

        if (args.o) {

            // Open the browser to point to the relayed URL.
            childProcess.spawn('open', ['http://' + $host + ':' + $port]);

        }

    };

    /**
     * @property prototype
     * @type {Object}
     */
    Relayed.prototype = {

        /**
         * @constant DEFAULT_PORT
         * @type {Number}
         * @default 80
         */
        DEFAULT_PORT: 80,

        /**
         * @method _outputMessage
         * @param message {String}
         * @param backgroundColour {Number}
         * @return {void}
         * @private
         */
        _outputMessage: function _outputMessage(message, backgroundColour) {

            if (!message) {
                console.log('');
                return;
            }

            var msg = clc.xterm(15).bgXterm(backgroundColour);
            console.log(msg(' ' + pad(message, 100) + ' '));

        },

        /**
         * @method _initialiseServer
         * @param request {Object}
         * @param response {Object}
         * @return {void}
         * @private
         */
        _initialiseServer: function _initialiseServer(request, response) {

            // Setup the CORS permissions.
            this._configureCrossDomain(response);

            var targetPort = args.p || this.DEFAULT_PORT,
                parsedUrl  = url.parse(args.h);

            var headers  = request.headers;
            headers.host = parsedUrl.host;

            /**
             * @property relayedRequest
             * @type {Object}
             */
            var relayedRequest = this._getTransportProtocol().request({

                host:    headers.host,
                port:    targetPort,
                path:    request.url,
                method:  request.method,
                headers: headers

            }, function(data) {

                response.writeHead(data.statusCode, data.headers);

                // We've got an incoming request!
                this._outputMessage('Request', 6);
                this._outputMessage('Path: ' + request.url, 236);
                this._outputMessage('Code: ' + data.statusCode, 236);
                this._outputMessage();

                // When we receive data from the relayed request.
                data.on('data', function onData(datum) {
                    response.write(datum);
                });

                // When the connection has been closed.
                data.on('end', function onEnd() {
                    response.end();
                });

            }.bind(this));

            // We just need to write anything to complete the request.
            request.on('data', function onData() {
                relayedRequest.write();
            });

            // When we close the connection entirely.
            request.on('end', function onEnd() {
                relayedRequest.end();
            });

        },

        /**
         * Set all of the necessary headers for CORS support.
         *
         * @method _configureCrossDomain
         * @param response {Object}
         * @return {void}
         * @private
         */
        _configureCrossDomain: function _configureCrossDomain(response) {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            response.setHeader('Access-Control-Allow-Credentials', true);
        },

        /**
         * @method _getTransportProtocol
         * @return {Object}
         * @private
         */
        _getTransportProtocol: function _getTransportProtocol() {

            if (args.s) {

                // Process all HTTPS requests irrespective of certificates!
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                return require('https')

            }

            return require('http');

        }

    };

    // Okay, here we go!
    new Relayed();

})('127.0.0.1', 8910);