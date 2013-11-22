define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'views/base',
    'text!templates/main/loader.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    BaseView,
    loaderTemplate
) {
    'use strict';

    return BaseView.extend({
        el : $('#container'),
        render : function () {
            this.$el.html(Mustache.to_html(loaderTemplate));
        }
    });
});
