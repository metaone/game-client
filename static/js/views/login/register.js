/**
 * Register View
 *
 * @author Mykola Skorenkyi
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'bootstrap',
    'cookie',
    'config',
    'views/login/login',
    'models/login/register_user',
    'text!templates/login/partial/header.html',
    'text!templates/login/partial/footer.html',
    'text!templates/login/register.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    bootstrap,
    cookie,
    config,
    LoginView,
    RegisterUser,
    headerTemplate,
    footerTemplate,
    registerTemplate
) {
    'use strict';

    var handler = 'register',
        LANG_PATH = 'models.login.register_user.';

    return LoginView.extend({
        /**
         * View element
         */
        el: $('#container'),

        /**
         * Events mapping
         */
        events : {
            'click #register_view #login': 'login',
            'click #register_view #register': 'register'
        },

        /**
         * Initialize View
         */
        initialize: function () {
            _.bindAll(this);

            this._initWS(handler);
        },

        /**
         * Websocket onmessage event handler
         * @param resp
         * @private
         */
        _wsOnMessage: function (resp) {
            var response = JSON.parse(resp.data);

            if (!response.valid) {
                _.each(response.data['errors'], function (value, key) {
                    response.data['errors'][key] = GameApp.t(LANG_PATH + value)
                });
            }

            this._setStatus(response.valid, response.data);
        },

        /**
         * Render method
         */
        render: function () {
            this.$el.html(Mustache.to_html(registerTemplate, {
                header: Mustache.to_html(headerTemplate, {lang: this.lang}),
                footer: Mustache.to_html(footerTemplate, {lang: this.lang}),
                lang: this.lang
            }));
        },

        /**
         * Login handler
         *
         * @param e
         */
        login: function (e) {
            e.preventDefault();

            GameApp.router.navigate('login', {trigger : true});
        },

        /**
         * Register handler
         *
         * @param e
         */
        register: function (e) {
            e.preventDefault();

            var user_data = this._getUserData(),
                user = new RegisterUser(user_data);

            this._clearStatus();

            if (user.isValid()) {
                this.ws.send(JSON.stringify(user_data));
            } else {
                this._setStatus(false, user.validationError);
            }
        },

        /**
         * Get user credentials from a form
         *
         * @returns {{username: *, email: *, password: *, password_repeat: *}}
         * @private
         */
        _getUserData: function () {
            return {
                username:        this.$el.find('#username').val(),
                email:           this.$el.find('#email').val(),
                password:        this.$el.find('#password').val(),
                password_repeat: this.$el.find('#password_repeat').val()
            }
        }
    });
});
