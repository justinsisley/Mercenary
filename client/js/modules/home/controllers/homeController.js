define(function(require) {
    var App = require('app');
    var HomeView = require('modules/home/views/homeView');
    var HeroView = require('modules/home/views/heroView');

    return {
        show: function() {
            var homeView = new HomeView();
            var heroView = new HeroView();
            
            App.publicLayout.heroRegion.show(heroView);
            App.publicLayout.signinRegion.empty();
            App.publicLayout.contentRegion.show(homeView);

            // Unfix the public footer from the bottom
            // of the page.
            App.vent.trigger('publicFooter:unfix');

            App.vent.trigger('homeController:show');
            App.vent.trigger('domchange:title');
        }
    };
});