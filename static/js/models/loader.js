define([
    'underscore',
    'backbone'
], function (
    _,
    Backbone
) {
    'use strict';

    var ProjectModel = Backbone.Model.extend({
        defaults: { name: "Harry Potter" }
    });
});
