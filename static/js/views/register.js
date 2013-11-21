/*
    Register View

    @author Mykola Skorenkyi
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/main/partial/header.html',
    'text!templates/main/partial/footer.html',
    'text!templates/main/register.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    headerTemplate,
    footerTemplate,
    registerTemplate
) {
    'use strict';

    return Backbone.View.extend({
        /*
            View element
         */
        el: $('#container'),

        /*
            Render method

            @return html
         */
        render: function () {
            this.$el.html(Mustache.to_html(registerTemplate, {
                header: Mustache.to_html(headerTemplate),
                footer: Mustache.to_html(footerTemplate)
            }));
        }
    });
});
