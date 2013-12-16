define([
    'models/base'
], function (
    BaseModel
) {
    'use strict';

    var LANG_PATH = 'models.login.login_user.';

    return BaseModel.extend({
        defaults: {
            username: false,
            password: false
        },

        validate: function () {
            var res = {
                'errors': [],
                'fields': []
            };

            if (!this.get('username')) {
                res['errors'].push(GameApp.t(LANG_PATH + 'empty_username'));
                res['fields'].push('username');
            }

            if (!this.get('password')) {
                res['errors'].push(GameApp.t(LANG_PATH + 'empty_password'));
                res['fields'].push('password');
            }

            return _.isEmpty(res['errors']) && _.isEmpty(res['fields']) ? false : res;
        }
    });
});
