/*
    Login View

    @author Mykola Skorenkyi
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'views/base',
    'models/login/login_user',
    'cookie',
    'config',
    'text!templates/login/partial/header.html',
    'text!templates/login/partial/footer.html',
    'text!templates/login/login.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    BaseView,
    LoginUser,
    cookie,
    config,
    headerTemplate,
    footerTemplate,
    loginTemplate
) {
    'use strict';

    var handler = 'login',
        LANG_PATH = 'models.login.login_user.';

    return BaseView.extend({
        /**
         * View element
         */
        el : $('#container'),

        /**
         * Events mapping
         */
        events : {
            'click #login_view #login': 'login',
            'click #login_view #register': 'register'
        },

        /**
         * Init method
         */
        initialize: function () {
            _.bindAll(this);

            this._initWS(handler);
        },

        _wsOnMessage: function (resp) {
            var response = JSON.parse(resp.data);

            if (!response.valid) {
                _.each(response.data['errors'], function (value, key) {
                    response.data['errors'][key] = GameApp.t(LANG_PATH + value)
                });

                this._setStatus(response.valid, response.data);
            } else {
                GameApp.router.navigate('welcome', {trigger : true});
            }
        },

        /**
         * Render method
         */
        render: function () {
            this.$el.html(Mustache.to_html(loginTemplate, {
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

            var user_data = this._getUserData(),
                user = new LoginUser(user_data);

            this._clearStatus();

            if (user.isValid()) {
                this.ws.send(JSON.stringify(user_data));
            } else {
                this._setStatus(false, user.validationError);
            }
        },

        /**
         * Register handler
         *
         * @param e
         */
        register: function (e) {
            e.preventDefault();
            GameApp.router.navigate('register', {trigger : true});
        },

        /**
         * Validate method
         *
         * @returns {*}
         * @private
         */
        _validate: function () {
            var username = this.$el.find('#username').val(),
                password = this.$el.find('#password').val();

            return username && password;
        },

        /**
         * Get user credentials from a form
         *
         * @returns {{username: *, password: *}}
         * @private
         */
        _getUserData: function () {
            return {
                username: this.$el.find('#username').val(),
                password: this.$el.find('#password').val()
            }
        },

        /**
         * Clears a form
         *
         * @private
         */
        _clearStatus: function () {
            this.$el.find('#status_info')
                .addClass('hidden')
                .find('.alert')
                .empty()
                .removeClass('alert-danger')
                .removeClass('alert-success');

            this.$el.find('.form-group.field')
                .removeClass('has-error')
                .removeClass('has-success')
        },

        /**
         * Displays status of a register operation
         *
         * @param success
         * @param data
         * @private
         */
        _setStatus: function (success, data) {
            var status = this.$el.find('#status_info'),
                status_messages = status.find('.alert');

            status.removeClass('hidden');
            this.$el.find('.form-group.field').addClass('has-success');

            if (success) {
                status_messages.addClass('alert-success');
                status_messages.append($('<p>').html(GameApp.t(LANG_PATH + 'success_message')));
            } else {
                status_messages.addClass('alert-danger');
                _.each(data['errors'], function (error) {
                    status_messages.append($('<p>').html(error));
                });


                _.each(data['fields'], _.bind(function (field) {
                    this.$el.find('#' + field).parents('.form-group.field')
                        .removeClass('has-success')
                        .addClass('has-error');
                }, this));
            }
        }
    });
});
