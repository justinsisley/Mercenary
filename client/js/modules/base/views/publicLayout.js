/**
 * The public layout.
 */
define(function(require) {
    var Marionette = require('marionette');
    
    return Marionette.LayoutView.extend({
        template: 'base/publicLayout',

        className: 'site-wrapper-inner',

        regions: {
            headerRegion    : '#header-region',
            mainRegion      : '#main-region',
            footerRegion    : '#footer-region'
        }
    });
});