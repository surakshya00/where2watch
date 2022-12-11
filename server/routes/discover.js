const express = require('express');
const { getTrendingMovies } = require('../services/tmdb');
const router = express.Router();

router.get('/trending', async (req, res) => {
  try {
    const movies = await getTrendingMovies();
    return res.status(200).json({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

module.exports = router;
