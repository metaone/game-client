/**
    Base View
    Use it a base for any kind of views

    @author Mykola Skorenkyi
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'config',
], function (
    $,
    _,
    Backbone,
    Mustache,
    config
) {
    'use strict';

    return Backbone.View.extend({
        /**
         * Translation wrapper for Mustache
         *
         * @returns {Function}
         */
        lang: function () {
            return function (key) {
                return GameApp.t(key);
            }
        },

        _initWS: function (handler) {
            this.ws = new WebSocket(config.protocol + config.host + ':' + config.port + '/' + handler);

            this.ws.onopen    = this._wsOnOpen;
            this.ws.onmessage = this._wsOnMessage;
            this.ws.onclose   = this._wsOnClose;
            this.ws.onerror   = this._wsOnError;
        },

        _wsOnOpen: $.noop,

        _wsOnMessage: $.noop,

        _wsOnClose: $.noop,

        _wsOnError: $.noop
    });
});
