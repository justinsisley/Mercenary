define([
    'app',

    'modules/header/views/publicHeaderView'
],function(
    App,

    PublicHeaderView
) {
    return {
        show: function() {
            var publicHeaderView = new PublicHeaderView();
            
            App.publicLayout.headerRegion.show(publicHeaderView);

            App.vent.trigger('publicHeaderController:show');
        }
    };
});