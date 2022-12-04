const express = require('express');
const { createUser } = require('../services/user');

const router = express.Router();

// route to get all watchlists for the user
router.post('/register', async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const user = await createUser(email, firstName, lastName);
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

module.exports = router;
