const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

require('dotenv').config();

const User = require('../models/user');

module.exports = function (passport) {
  passport.use(
    'local-login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await User.findOne({ email: email }).select('+password');

        if (!user)
          done(null, false, { message: 'That email is not registered' });

        user &&
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
      }
    )
  );

  passport.use(
    'local-register',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) return done(err);
          if (user) {
            done(null, false, { message: 'Email already registered!!' });
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw createError(500, 'Server error...');

                User.create({ ...req.body, password: hash })
                  .then((user) => done(null, user))
                  .catch((err) => done(err));
              });
            });
          }
        });
      }
    )
  );

  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        User.findOne({ password: profile.id }).then((user) => {
          if (user) {
            console.log('user already exists');
            return done(null, user);
          } else {
            console.log('creating user');
            User.create({
              email: profile.email,
              password: profile.id,
            }).then((user) => done(null, user));
          }
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    User.findById(id, function (err, user) {
      const currentUser = {
        _id: user._id,
        email: user.email,
        role: user.role
      };
      done(err, currentUser);
    });
  });
};
