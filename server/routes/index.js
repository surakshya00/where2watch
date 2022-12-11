const express = require('express');

const router = express.Router();

// import route dependencies
const search = require('./search');
const watchlists = require('./watchlists');
const users = require('./users');
const discover = require('./discover');

// register routes
router.use('/search', search);
router.use('/watchlists', watchlists);
router.use('/users', users);
router.use('/discover', discover);

// use to check if service is online
router.get('/service/health', (req, res) => {
  return res.status(200).json({ message: 'service is up' });
});

// reject all invalid path
router.get('*', (req, res) => {
  return res
    .status(404)
    .json({ error: '400-bad-request', message: 'Invalid endpoint' });
});

module.exports = router;
