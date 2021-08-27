const createError = require('http-errors');

module.exports = {
  authorize: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.role === 'admin') {
        return next();
      }
    }
    return next(createError(403, 'Cannot Use this route'));
  },
};
