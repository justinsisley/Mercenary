/**
 * Bootstrap the application.
 */
var Backbone    = require('backbone');
var App         = require('app');
var User        = require('modules/users/models/userModel');
var routers     = require('helpers/routers');
var linkHandler = require('helpers/linkHandler');

// Runs as soon as App.start() is called
App.addInitializer(function() {
    // Check for an existing session,
    // then start the application in the
    // appropriate state.
    $.get('/users/session')
    .always(function(response) {
        // If the session fetch was successful,
        // put the returned user data in our local
        // object and navigate to the dashboard.
        if (response && response.user) {
            App.vars.user = new User(response.user);
        }

        // Instantiate routers
        App.routers = routers.start();

        // Start Backbone.history
        var pageFound = Backbone.history.start({pushState: true});

        // If the user navigated directly to a path
        // that isn't handled by a router, show a 404.
        if (!pageFound) {Backbone.history.navigate('/404', true);}

        // Unless an anchor tag has a "target" attribute
        // with a value of "_blank" or "_self", Backbone
        // will handle all links.
        $('a', 'body').on('click', linkHandler);
    });
});

App.start();

module.exports = App;