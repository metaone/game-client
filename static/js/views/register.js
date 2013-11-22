/*
    Register View

    @author Mykola Skorenkyi
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'views/base',
    'text!templates/main/partial/header.html',
    'text!templates/main/partial/footer.html',
    'text!templates/main/register.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    BaseView,
    headerTemplate,
    footerTemplate,
    registerTemplate
) {
    'use strict';

    return BaseView.extend({
        /*
            View element
         */
        el: $('#container'),

        /*
            Events mapping
         */
        events : {
            'click #register_view #login': 'login',
            'click #register_view #register': 'register'
        },


        /*
            Render method

            @return html
         */
        render: function () {
            this.$el.html(Mustache.to_html(registerTemplate, {
                header: Mustache.to_html(headerTemplate),
                footer: Mustache.to_html(footerTemplate)
            }));
        },

        /*
            Login handler
         */
        login: function (e) {
            e.preventDefault();

            window.app_router.navigate('login', {trigger : true});

            return false;
        },

        /*
            Register handler
         */
        register: function (e) {
            e.preventDefault();

            alert('register');

            return false;
        }
    });
});
