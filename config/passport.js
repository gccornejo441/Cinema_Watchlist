
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Users = require('../models/Users');


passport.use(new LocalStrategy((username, password, done) => {

        Users.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) return err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Password Incorrect' })
              }
            })

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

