/**
 * Base View
 * Use it as a base for any view
 * @author Mykola Skorenkyi
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
         * @returns {Function}
         */
        lang: function () {
            return function (key) {
                return GameApp.t(key);
            }
        },

        /**
         * Open WebSocket and binds default events handlers
         * @param handler
         * @private
         */
        _initWS: function (handler) {
            this.ws = new WebSocket(config.protocol + config.host + ':' + config.port + '/' + handler);

            this.ws.onopen    = this._wsOnOpen;
            this.ws.onmessage = this._wsOnMessage;
            this.ws.onclose   = this._wsOnClose;
            this.ws.onerror   = this._wsOnError;
        },

        /**
         * Default WebSocket onopen event handler
         */
        _wsOnOpen: $.noop,

        /**
         * Default WebSocket onmessage event handler
         */
        _wsOnMessage: $.noop,

        /**
         * Default WebSocket onclose event handler
         */
        _wsOnClose: $.noop,

        /**
         * Default WebSocket onerror event handler
         */
        _wsOnError: $.noop
    });
});
