const express = require('express');
const { getAllWatchlistsForUser } = require('../services/watchlist');

const router = express.Router();

// route to get all watchlists for the user
router.get('/', async (req, res) => {
  try {
    const userId = '638bec9c887eade40b5a68d4';
    const watchlists = await getAllWatchlistsForUser(userId);
    return res.status(200).json({ watchlists });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

module.exports = router;
