const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Employees = mongoose.model('Employee');

passport.use(new LocalStrategy({
    usernameField: 'Employee[login]',
    passwordField: 'Employee[password]',
}, (login, password, done) => {
    Employees.findOne({ login })
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'login or password': 'is invalid' } });
            }
            return done(null, user);
        }).catch(done);
}));