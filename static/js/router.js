define([
    'jquery',
    'underscore',
    'backbone',
    'views/loader',
    'views/login/login',
    'views/login/register',
    'views/error',
    'views/index',
    'views/game/welcome'
], function(
    $,
    _,
    Backbone,
    LoaderView,
    LoginView,
    RegisterView,
    ErrorView,
    IndexView,
    WelcomeView
) {
    'use strict';

    var active_view = false;

    return Backbone.Router.extend({
        routes : {
            ''        : 'index_route',
            'loader'  : 'loader_route',
            'login'   : 'login_route',
            'register': 'register_route',
            'welcome' : 'welcome_route',
            '*default': 'error_route'
        },

        _initView: function (view) {
            if (active_view) {
                active_view.undelegateEvents();
            }

            active_view = view;

            view.render();
        },

        index_route: function () {
            this._initView(new IndexView());
        },

        loader_route: function () {
            this._initView(new LoaderView());
        },

        login_route: function () {
            this._initView(new LoginView());
        },

        register_route: function () {
            this._initView(new RegisterView());
        },

        welcome_route: function () {
            this._initView(new WelcomeView());
        },

        error_route: function (route) {
            this._initView(new ErrorView());
            console.log('Error: no route ', route);
        }
    });
});
