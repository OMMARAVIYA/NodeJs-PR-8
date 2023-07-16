const express = require('express');

const port =8080;

const app = express();

const db = require('./config/mongoose');

const path = require('path');

const flash = require('connect-flash');

const passport = require('passport');
const session = require('express-session');
const passportlocal = require('./config/passport-local');

const cookie = require('cookie-parser');

app.use('/uploads',express.static(path.join(__dirname,('uploads'))));

app.use(session({
    secret: 'Admin',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(flash());
app.use(cookie());

app.use((req, res, next) => {
    res.locals.message = {
        'success': req.flash('success'),
        'danger': req.flash('danger')
    }
    next();
})

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthentication)

app.use(express.static(path.join(__dirname, 'publics')));

app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use('/', require('./routes'))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Server is Start on Port :-" + port);
})