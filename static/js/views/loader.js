define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/main/loader.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    loaderTemplate
) {
    'use strict';

    var LoaderView = Backbone.View.extend({
        el : $('#container'),
        render : function () {
            this.$el.html(Mustache.to_html(loaderTemplate));
        }
    });

    return LoaderView;
});
