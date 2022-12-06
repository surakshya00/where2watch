const express = require('express');
const { getAllWatchlistsForUser, createWatchlist, addMovieToWatchlist, removeMovieFromWatchlist, deleteWatchlist } = require('../services/watchlist');

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

// route to add to watchlist
router.post('/', async (req, res) => {
  try {
    const userId = '638bec9c887eade40b5a68d4';
    const watchlistId = '222jh2';
    const movieId = '22222';
    const movieTitle = '2jkwb2';
    const moviePoster = "jsddfdsf";
    const watchlists = await addMovieToWatchlist(watchlistId, userId, movieId,
       movieTitle, moviePoster);
    return res.status(200).json({ watchlists });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});


// route to delete from watchlist
router.delete('/', async (req, res) => {
  try {
    const userId = '638bec9c887eade40b5a68d4';
    const watchlistId = '222jh2';
    const movieId = '22222';
    const watchlists = await removeMovieFromWatchlist(watchlistId, userId,
       movieId);
    return res.status(200).json({ watchlists });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});


// route to create watchlist
router.put('/', async (req, res) => {
  try {
    const userId = '638bec9c887eade40b5a68d4';
    const title = '222jh2';
    const watchlists = await createWatchlist(title, userId);
    return res.status(200).json({ watchlists });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});


// route to delete watchlist
router.delete('/', async (req, res) => {
  try {
    const userId = '638bec9c887eade40b5a68d4';
    const watchlistId = '222jh2';
    const watchlists = await deleteWatchlist(watchlistId, userId);
    return res.status(200).json({ watchlists });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});


module.exports = router;
