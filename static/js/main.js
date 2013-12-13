require.config({
    paths : {
        backbone  : 'libs/backbone',
        jquery    : 'libs/jquery-2.0.2',
        mustache  : 'libs/mustache',
        underscore: 'libs/underscore',
        text      : 'libs/text',
        cookie    : 'libs/jquery.cookie',
        i18next   : 'libs/i18next',
        bootstrap : 'libs/bootstrap'
    },
    shim : {
        cookie: {
            deps: ['jquery']
        },
        i18next: {
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require([
    'app'
], function (
    Application
) {
    'use strict';

    var app = new Application();
});
