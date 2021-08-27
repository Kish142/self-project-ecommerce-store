//handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `An account with that ${field} already exists.`;
  res.status(code).json({ messages: error });
};
//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  // let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;
  if (errors.length > 1) {
    // const formattedErrors = errors.join('');
    res.status(code).json({ error: errors });
  } else {
    res.status(code).json({ messages: errors });
  }
};

//error controller function
module.exports = (err, req, res, next) => {
  console.log(err.message);
  console.log(err.name);
  try {
    // if (err.name === 'ValidationError') {
    //   return (err = handleValidationError(err, res));
    // } else if (err.code && err.code == 11000) {
    //   return (err = handleDuplicateKeyError(err, res));
    // } else {
    //   return res
    //     .status(err.status || 500)
    //     .json({ error: err.message || 'An Unknown error occured...' });
    // }

    switch (true) {
      case err.name === 'ValidationError':
        return (err = handleValidationError(err, res));
      case err.code && err.code == 11000:
        return (err = handleDuplicateKeyError(err, res));
      case err.name === 'CastError':
        return res.status(404).json({ error: 'URL not found' });
      default:
        return res
          .status(err.status || 500)
          .json({ error: err.message || 'An Unknown error occured...' });
    }
  } catch (err) {
    res.status(500).json({ error: 'An Unknown eror occured...' });
  }
};
