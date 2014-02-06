define([
    'app',

    'modules/login/views/loginView'
],function(
    App,

    LoginView
) {
    'use strict';

    return {
        show: function() {
            var loginView = new LoginView();
            
            App.publicLayout.mainRegion.show(loginView);

            App.vent.trigger('loginController:show');
        }
    };
});