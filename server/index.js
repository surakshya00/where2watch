const mongoose = require('mongoose'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser');

/**
 * Configure Mongoose database connector
 */
mongoose.set('toJSON', {
  virtuals: true,
});

mongoose.set('toObject', {
  virtuals: true,
});

/**
 * Configure Express
 */
const app = express();

// Allow Content-Type of application/json
app.use(express.json());

// allow parsing cookies on server-side
app.use(cookieParser());

// add api endpoints
const routes = require('./routes');
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  // for production builds, use output of react-build
  const root = require('path').join(__dirname, '..', 'client', 'build');
  app.use(express.static(root));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
  });
} else {
  app.get('*', (_, res) => {
    res
      .status(404)
      .json({ error: '400-bad-request', message: 'Invalid endpoint' });
  });
}

module.exports = app;
