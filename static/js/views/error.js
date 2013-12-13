define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'views/base',
    'text!templates/login/error.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    BaseView,
    errorTemplate
) {
    'use strict';

    return BaseView.extend({
        el: $('#container'),

        render: function () {
            this.$el.html(Mustache.to_html(errorTemplate, {error_text : '404! Page not found'}));
        }
    });
});
