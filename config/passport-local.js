const passport = require("passport");

const usertbl = require('../models/UserTbl');

const passportLocal = require('passport-local').Strategy;

passport.use(new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        let user = await usertbl.findOne({ email: email });
        if (!email || !password) {
            console.log("Please Fill All The Data");
            return done(null, false);
        }
        if (!user) {
            console.log("Email Not Found");
            return done(null, false);
        }
        else {
            if (user.password != password) {
                console.log("Please Enter Correct Password");
                return done(null, false);
            }
            else {
                return done(null, user);
            }
        }
    }
    catch (err) {
        console.log(err);
        return done(null, false);
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await usertbl.findById(id);
        return done(null, user);
    }
    catch (err) {
        console.log(err);
        return done(null, false);
    }
})

passport.ChechAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

passport.setAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.users = req.user;
    }
    return next();
}

module.exports = passport;