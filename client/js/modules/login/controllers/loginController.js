define(function(require) {
    var App = require('app');
    var LoginView = require('modules/login/views/loginView');
    var HeroView = require('modules/login/views/heroView');

    return {
        show: function() {
            var loginView = new LoginView();
            var heroView = new HeroView();
            
            App.publicLayout.heroRegion.show(heroView);
            App.publicLayout.signinRegion.show(loginView);
            App.publicLayout.contentRegion.empty();

            // Fix the public footer to the bottom
            // of the page.
            App.vent.trigger('publicFooter:fix');

            App.vent.trigger('loginController:show');
            App.vent.trigger('domchange:title', 'Log In');
        }
    };
});