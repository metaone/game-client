require.config({
    paths: {
        backbone   : 'libs/backbone',
        jquery     : 'libs/jquery-2.0.2',
        mustache   : 'libs/mustache',
        underscore : 'libs/underscore',
        text       : 'libs/text'
    }
});

require([
    'app'
], function (
    App
) {
    'use strict';

    App.initialize();
});
