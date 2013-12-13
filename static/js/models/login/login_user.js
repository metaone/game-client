define([
    'models/base'
], function (
    BaseModel
) {
    'use strict';

    return BaseModel.extend({
        defaults: {
            username: false,
            password: false
        },

        validate: function () {
            if (!this.username) {
                return 'Please fill username field.';
            }

            if (!this.password) {
                return 'Please fill password field.';
            }
        }
    });
});
