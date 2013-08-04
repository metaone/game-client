define([
    'jquery',
    'underscore',
    'backbone',
    'views/loader',
    'views/login',
    'views/error'
], function(
    $,
    _,
    Backbone,
    LoaderView,
    LoginView,
    ErrorView
) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes : {
            ''         : 'index_route',
            'loader'   : 'loader_route',
            'login'    : 'login_route',
            '*default' : 'error_route'
        }
    });

    var initialize = function () {
        window.app_router = new AppRouter;

        app_router.on('route:index_route', function () {
            var loaderView = new LoaderView();
            loaderView.render();
        });

        app_router.on('route:loader_route', function () {
            var loaderView = new LoaderView();
            loaderView.render();
        });

        app_router.on('route:login_route', function () {
            var loginView = new LoginView();
            loginView.render();
        });

        app_router.on('route:error_route', function (route) {
            var loaderView = new ErrorView();
            loaderView.render();
            console.log('Error: no route ', route);
        });

        Backbone.history.start();
    };

    return {
        initialize : initialize
    };
});
