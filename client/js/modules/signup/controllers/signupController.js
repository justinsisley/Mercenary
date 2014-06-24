define(function(require) {
    var App = require('app');
    var SignupView = require('modules/signup/views/signupView');
    var HeroView = require('modules/signup/views/heroView');

    return {
        show: function() {
            var signupView = new SignupView();
            var heroView = new HeroView();
            
            App.publicLayout.heroRegion.show(heroView);
            App.publicLayout.signinRegion.show(signupView);
            App.publicLayout.contentRegion.empty();

            // Fix the public footer to the bottom
            // of the page.
            App.vent.trigger('publicFooter:fix');

            App.vent.trigger('signupController:show');
            App.vent.trigger('domchange:title', 'Sign Up');
        }
    };
});