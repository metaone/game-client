define([
    'jquery',
    'underscore',
    'backbone',
    'views/loader',
    'views/error'
], function(
    $,
    _,
    Backbone,
    LoaderView,
    ErrorView
) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes : {
            ''         : 'index_route',
            'loader'   : 'loader_route',
            '*default' : 'error_route'
        }
    });

    var initialize = function () {
        var app_router = new AppRouter;

        app_router.on('route:index_route', function () {
            var loaderView = new LoaderView();
            loaderView.render();
        });

        app_router.on('route:loader_route', function () {
            var loaderView = new LoaderView();
            loaderView.render();
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
