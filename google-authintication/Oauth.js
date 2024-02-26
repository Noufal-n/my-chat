const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '335862420941-q5qsdga8dqct8ork3krcvhvp5srul80b.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/chat"
},
    function (accessToken, refreshToken, profile, cb) {

        return cb(null, profile);

    }
));
passport.serializeUser(function (user, cb) {
    cb(null, user);
})
passport.deserializeUser(function (user, cb) {
    cb(null, user);
})