define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'views/base',
    'text!templates/login/partial/header.html',
    'text!templates/login/partial/footer.html',
    'text!templates/login/index.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    BaseView,
    headerTemplate,
    footerTemplate,
    IndexTemplate
) {
    'use strict';

    return BaseView.extend({
        el: $('#container'),

        render: function () {
            this.$el.html(Mustache.to_html(IndexTemplate, {
                header: Mustache.to_html(headerTemplate),
                footer: Mustache.to_html(footerTemplate)
            }));
        }
    });
});
