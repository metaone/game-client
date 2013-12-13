define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'config',
    'i18next'
], function(
    $,
    _,
    Backbone,
    Router,
    config,
    i18next
) {
    'use strict';

    var handler = 'ws';

    return function () {
        i18next.init({
            lng: 'en',
            resGetPath: 'static/locales/__lng__/translation.json',
            fallbackLng: 'en'
        }, function () {
            window.GameApp = {
                router: new Router(),
                t: i18next.t
            }

            Backbone.history.start();

            var ws = new WebSocket(config.protocol + config.host + ':' + config.port + '/' + handler);

            ws.onopen = function() {
                ws.send('Hello, world');
            };

            ws.onmessage = function (evt) {};
        });
    };
});
