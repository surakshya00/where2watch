const express = require('express');
const {
  getTrendingMovies,
  getTopRatedMovies,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getDocumentaries,
} = require('../services/tmdb');
const router = express.Router();

router.get('/trending', async (req, res) => {
  try {
    const movies = await getTrendingMovies();
    return res.status(200).json({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/top-rated', async (req, res) => {
  try {
    const movies = await getTopRatedMovies();
    return res.status(200).json({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/action', async (req, res) => {
  try {
    const movies = await getActionMovies();
    return res.status(200).json({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/comedy', async (req, res) => {
  try {
    const movies = await getComedyMovies();
    return res.status(200).json({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/horror', async (req, res) => {
  try {
    const movies = await getHorrorMovies();
    return res.status(200).json({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/romance', async (req, res) => {
  try {
    const movies = await getRomanceMovies();
    return res.status(200).json({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/documentary', async (req, res) => {
  try {
    const movies = await getDocumentaries();
    return res.status(200).json({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

module.exports = router;
