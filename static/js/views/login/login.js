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
    cookie,
    config,
    headerTemplate,
    footerTemplate,
    loginTemplate
) {
    'use strict';

    return BaseView.extend({
        /*
            View element
         */
        el : $('#container'),

        /*
            Events mapping
         */
        events : {
            'click #login_view #login': 'login',
            'click #login_view #register': 'register'
        },

        /*
            Init method
         */
        initialize: function () {
            _.bindAll(this);

            this.ws_handler = 'login';

            this.WSAuth = new WebSocket(config.protocol + config.host + ':' + config.port + '/' + this.ws_handler);

            this.WSAuth.onmessage = function (evt) {
                var response = JSON.parse(evt.data);
                if (response.status === 'success') {
                    $.cookie('user', response.cookie);
                    GameApp.router.navigate('loader', {trigger : true});
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

            GameApp.router.navigate('register', {trigger : true});

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
