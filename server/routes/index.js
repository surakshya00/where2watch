const express = require('express');

const router = express.Router();

router.get('/service/health', (req, res) => {
  return res.status(200).json({ message: 'service is up' });
});

router.get('*', (req, res) => {
  return res
    .status(404)
    .json({ error: '400-bad-request', message: 'Invalid endpoint' });
});

module.exports = router;
