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

    var initialize = function () {
        Router.initialize();

        var ws = new WebSocket('ws://' + config.host + ':' + config.port + '/' + handler);

        ws.onopen = function() {
            ws.send("Hello, world");
        };

        ws.onmessage = function (evt) {
            console.log(evt.data);
        };
    }

    return {
        initialize: initialize
    };
});
