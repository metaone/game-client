define([
    'models/base'
], function (
    BaseModel
) {
    'use strict';

    var LANG_PATH = 'models.login.register_user.';

    return BaseModel.extend({
        defaults: {
            username:        false,
            email:           false,
            password:        false,
            password_repeat: false
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

            if (!this.get('email')) {
                res['errors'].push(GameApp.t(LANG_PATH + 'empty_email'));
                res['fields'].push('email');
            }

            if (!this.get('password')) {
                res['errors'].push(GameApp.t(LANG_PATH + 'empty_password'));
                res['fields'].push('password');
            }

            if (!this.get('password_repeat')) {
                res['errors'].push(GameApp.t(LANG_PATH + 'empty_repeat'));
                res['fields'].push('password_repeat');
            }

            if (this.get('password') !== this.get('password_repeat')) {
                res['errors'].push(GameApp.t(LANG_PATH + 'password_mismatch'));
                if (_.indexOf(res['fields'], 'password') < 0) {
                    res['fields'].push('password');
                }
                if (_.indexOf(res['fields'], 'password_repeat') < 0) {
                    res['fields'].push('password_repeat');
                }
            }

            return _.isEmpty(res['errors']) && _.isEmpty(res['fields']) ? false : res;
        }
    });
});
