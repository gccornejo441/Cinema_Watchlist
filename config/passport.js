
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const validPassword = require('../lib/passwordUtils').validPassword;

const Users = require('../models/Users');


passport.use(new LocalStrategy((username, password, done) => {

        Users.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }

            const isValid = validPassword(password, user.hash, user.salt);

            if (isValid) {
              return done(null, user);
            } else {
              return done(null, false);
            }

          })
          .catch((err) => done(err));
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

