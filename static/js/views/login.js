define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'cookie',
    'text!templates/login.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    cookie,
    loginTemplate
) {
    'use strict';

    var LoaderView = Backbone.View.extend({
        events : {
            'click #login' : 'login'
        },

        el : $('#container'),

        initialize : function () {
            this.WSAuth = new WebSocket('ws://localhost:8888/auth');

            this.WSAuth.onopen = function() {

            };

            this.WSAuth.onmessage = function (evt) {
                var response = JSON.parse(evt.data);
                if (response.status === 'success') {
                    $.cookie('user', response.cookie);
                    window.app_router.navigate('loader', {trigger : true});
                } else {
                    alert('error');
                    $('#username').val('');
                    $('#password').val('');
                }
                console.log(response);
            };
        },

        render : function () {
            this.$el.html(Mustache.to_html(loginTemplate, {}));
        },

        login : function (e) {
            e.preventDefault();

            var username = this.$el.find('#username').val(),
                password = this.$el.find('#password').val();

            if (this._validate()) {
                this.WSAuth.send(JSON.stringify({
                    username : username,
                    password : password
                }));
            } else {
                alert('error');
            }

            return false;
        },

        _validate : function () {
            var username = this.$el.find('#username').val(),
                password = this.$el.find('#password').val(),
                result   = false;


            if (username && password) {
                result = true;
            }

            return result;
        }
    });

    return LoaderView;
});
