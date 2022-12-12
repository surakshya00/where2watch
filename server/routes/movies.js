const express = require('express');
const {
  getMovieDetails,
  getMovieVideos,
  getMovieProviders,
} = require('../services/tmdb');

const router = express.Router();

router.get('/:movieId', async (req, res) => {
  try {
    const movie = await getMovieDetails(req.params.movieId);
    return res.status(200).json({ movie });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/:movieId/videos', async (req, res) => {
  try {
    const videos = await getMovieVideos(req.params.movieId);
    return res.status(200).json({ videos });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/:movieId/providers', async (req, res) => {
  try {
    const providers = await getMovieProviders(req.params.movieId);
    return res.status(200).json({ providers: providers?.['US'] });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

module.exports = router;
