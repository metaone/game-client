/**
 * Welcome page view
 * @author Mykola Skorenkyi
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'views/base',
    'text!templates/game/welcome.html'
], function(
    $,
    _,
    Backbone,
    Mustache,
    BaseView,
    WelcomeTemplate
) {
    'use strict';

    return BaseView.extend({
        el: $('#container'),

        render: function () {
            this.$el.html(Mustache.to_html(WelcomeTemplate, {lang: this.lang}));
        }
    });
});
