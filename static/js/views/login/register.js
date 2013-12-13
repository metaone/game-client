/*
    Register View

    @author Mykola Skorenkyi
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'bootstrap',
    'cookie',
    'config',
    'views/base',
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
    BaseView,
    RegisterUser,
    headerTemplate,
    footerTemplate,
    registerTemplate
) {
    'use strict';

    var handler = 'register',
        LANG_PATH = 'models.login.register_user.';

    return BaseView.extend({
        /*
            View element
         */
        el: $('#container'),

        /*
            Events mapping
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

        _wsOnMessage: function (resp) {
            var response = JSON.parse(resp.data);

            if (!response.valid) {
                _.each(response.data['errors'], function (value, key) {
                    response.data['errors'][key] = GameApp.t(LANG_PATH + value)
                });
            }

            this._setStatus(response.valid, response.data);
        },

        /*
            Render method

            @return html
         */
        render: function () {
            this.$el.html(Mustache.to_html(registerTemplate, {
                header: Mustache.to_html(headerTemplate, {lang: this.lang}),
                footer: Mustache.to_html(footerTemplate, {lang: this.lang}),
                lang: this.lang
            }));
        },

        /*
            Login handler
         */
        login: function (e) {
            e.preventDefault();

            GameApp.router.navigate('login', {trigger : true});

            return false;
        },

        /*
            Register handler
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

            return false;
        },

        _getUserData: function () {
            return {
                username:        this.$el.find('#username').val(),
                email:           this.$el.find('#email').val(),
                password:        this.$el.find('#password').val(),
                password_repeat: this.$el.find('#password_repeat').val()
            }
        },

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
        },

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
        }
    });
});
