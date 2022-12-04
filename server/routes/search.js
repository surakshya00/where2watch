const express = require('express');
const { discoverMovies } = require('../services/tmdb');

const router = express.Router();

router.post('/', async (req, res) => {
  const { filters } = req.body;

  if (!filters) {
    return res.status(400).json({ message: 'Please specify search filters' });
  }

  try {
    const newMovies = await discoverMovies(filters);
    return res.status(200).json({ movies: newMovies });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Failed to retrieve movies' });
  }
});

module.exports = router;
