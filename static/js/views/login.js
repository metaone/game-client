/*
    Login View

    @author Mykola Skorenkyi
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'cookie',
    'config',
    'text!templates/main/partial/header.html',
    'text!templates/main/partial/footer.html',
    'text!templates/main/login.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    cookie,
    config,
    headerTemplate,
    footerTemplate,
    loginTemplate
) {
    'use strict';

    var handler = 'auth';

    return Backbone.View.extend({
        /*
            View element
         */
        el : $('#container'),

        /*
            Events mapping
         */
        events : {
            'click #login': 'login',
            'click #register': 'register'
        },

        /*
            Init method
         */
        initialize: function () {
            this.WSAuth = new WebSocket('ws://' + config.host + ':' + config.port + '/' + handler);

            this.WSAuth.onmessage = function (evt) {
                var response = JSON.parse(evt.data);
                if (response.status === 'success') {
                    $.cookie('user', response.cookie);
                    window.app_router.navigate('loader', {trigger : true});
                } else {
                    alert('error: ' + response.status);
                    $('#username').val('qw');
                    $('#password').val('qw');
                }
                console.log(response);
            };
        },

        /*
            Render method

            @return html
         */
        render: function () {
            this.$el.html(Mustache.to_html(loginTemplate, {
                header: Mustache.to_html(headerTemplate),
                footer: Mustache.to_html(footerTemplate)
            }));
        },

        /*
            Login handler
         */
        login: function (e) {
            e.preventDefault();

            var username = this.$el.find('#username').val(),
                password = this.$el.find('#password').val();

            if (this._validate()) {
                this.WSAuth.send(JSON.stringify({
                    username: username,
                    password: password
                }));
            } else {
                alert('error');
            }

            return false;
        },

        /*
            Register handler
         */
        register: function (e) {
            e.preventDefault();

            window.app_router.navigate('register', {trigger : true});

            return false;
        },

        /*
            Validate method

            @private
            @return boolean
         */
        _validate: function () {
            var username = this.$el.find('#username').val(),
                password = this.$el.find('#password').val();

            return username && password;
        }
    });
});
