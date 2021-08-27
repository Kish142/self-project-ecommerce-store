const passport = require('passport');
const createError = require('http-errors');

exports.register = async (req, res, next) => {
  passport.authenticate('local-register', function (err, user, info) {
    if (err) {
      return next(createError(err));
    }
    if (!user) {
      res.status(401).json({ error: info.message });
    }

    user &&
      req.login(user, (err) => {
        if (err) {
          createError(500, 'Server error');
          return;
        }
        res.status(200).json({ user: user });
      });
  })(req, res, next);
};

exports.login = async (req, res, next) => {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json({ error: info.message });
      return;
    }

    req.login(user, (err) => {
      if (err) {
        createError(500, 'Server error');
        return;
      }
      res.status(200).json({ user: user });
    });
  })(req, res, next);
};

exports.googleAuth = async (req, res, next) => {
  passport.authenticate('google', { scope: ['email', 'profile'] })(
    req,
    res,
    next
  );
};

exports.googleAuthCb = (req, res, next) => {
  // passport.authenticate('google', function (err, user) {
  //   if (err) return next(err);

  //   if (!user) {
  //     return createError(500, 'Server error');
  //   }

  //   if (user) {
  //     res.redirect('http://localhost:3000/');
  //   }

  //   // req.login(user, (err) => {
  //   //   if (err) {
  //   //     createError(500, 'Server error');
  //   //     return;
  //   //   }

  //   //   res.redirect('http://localhost:3000/');
  //   // });
  // })(req, res, next);

  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/',
  })(req, res, next);
};

exports.logout = async (req, res) => {
  await req.logout();
  req.session.destroy(() => res.status(200).json({ msg: 'User Logged out' }));
};
