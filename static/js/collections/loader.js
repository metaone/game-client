define([
    'underscore',
    'backbone',
    'models/loader'
], function (
    _,
    Backbone,
    LoaderModel
) {
    'use strict';

    var LoaderCollection = Backbone.Collection.extend({
        model : LoaderModel
    });

    return LoaderCollection;
});
