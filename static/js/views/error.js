define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/main/error.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    errorTemplate
) {
    'use strict';

    var LoaderView = Backbone.View.extend({
        el : $('#container'),
        render : function () {
            this.$el.html(Mustache.to_html(errorTemplate, {error_text : '404! Page not found'}));
        }
    });

    return LoaderView;
});
