/**
 * Sub-router for /auth paths.
 *
 * Note that because this is a "sub-router",
 * and we initialized it with app.use('/auth', authRouter),
 * all paths defined here will have '/user'
 * preceding them.
 * For example, router.get('/session', ...)
 * is actually creating the path: '/auth/facebook'.
 * 
 * See http://expressjs.com/4x/api.html#router
 * for more information about this technique.
 */

var config      = require('../config'),
    express     = require('express'),
    router      = express.Router(),
    passport    = require('passport');

if (config.AUTH_FACEBOOK_ENABLED) {
    router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}));
    router.get('/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
}

if (config.AUTH_GOOGLE_ENABLED) {
    router.get('/google', passport.authenticate('google', {scope: 'profile email'}));
    router.get('/google/callback', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
}

if (config.AUTH_TWITTER_ENABLED) {
    router.get('/twitter', passport.authenticate('twitter'));
    router.get('/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
}

if (config.AUTH_GITHUB_ENABLED) {
    router.get('/github', passport.authenticate('github'));
    router.get('/github/callback', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
}

module.exports = router;