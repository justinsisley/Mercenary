/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */
var Marionette = require('marionette');
var Controller = require('modules/users/controllers/main');

module.exports = Marionette.AppRouter.extend({
    controller: Controller,

    appRoutes: {
        'users': 'users'
    }
});