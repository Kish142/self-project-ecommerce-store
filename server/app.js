const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

const connectDB = require('./config/db');

// Route Files
const product = require('./routes/product');
const ErrorHandling = require('./middlewares/ErrorHandling');
const auth = require('./routes/auth');

const app = express();

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

// Load env
dotenv.config();

// Connect to db
connectDB();

// Body parser
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1 * 24 * 60 * 60 },
  })
);

// Passport Config
require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.get('/api/current-user', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(204).json({ msg: 'no user' });
  }
});

app.use('/api/product', product);
app.use('/api/auth', auth);

app.use(ErrorHandling);

app.get('*', function (req, res) {
  res.status(404).send('No Page Found');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port at ${port}`));
