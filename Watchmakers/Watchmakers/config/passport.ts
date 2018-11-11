const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Employees = mongoose.model('Employee');

passport.use(new LocalStrategy({
    usernameField: 'Employee[email]',
    passwordField: 'Employee[password]',
}, (email, password, done) => {
    Employees.findOne({ email })
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }

            return done(null, user);
        }).catch(done);
}));