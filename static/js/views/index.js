define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'views/base',
    'text!templates/main/partial/header.html',
    'text!templates/main/partial/footer.html',
    'text!templates/main/index.html'
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
