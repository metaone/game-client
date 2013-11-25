define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'config'
], function(
    $,
    _,
    Backbone,
    Router,
    config
) {
    'use strict';

    var handler = 'ws';

    return function () {
        window.app_router = new Router();

        Backbone.history.start();

        var ws = new WebSocket(config.protocol + config.host + ':' + config.port + '/' + handler);

        ws.onopen = function() {
            ws.send('Hello, world');
        };

        ws.onmessage = function (evt) {
            console.log(evt.data);
        };
    };
});
