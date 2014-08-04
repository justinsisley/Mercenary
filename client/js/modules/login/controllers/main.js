var App                 = require('app');
var showPublicLayout    = require('shared/layouts/controllers/publicLayout');
var LoginView           = require('modules/login/views/mainItem');
var HeroView            = require('modules/login/views/heroItem');

var controller = {
    login: function() {
        showPublicLayout(controller.show);
    },

    logout: function() {
        $.post('/users/logout')
        .done(function() {
            var protocol = window.location.protocol + '//';
            var host = window.location.host;

            window.location = protocol + host;
        });
    },

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

module.exports = controller;