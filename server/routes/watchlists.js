const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const {
  getAllWatchlistsForUser,
  createWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  deleteWatchlist,
  getWatchlistById,
} = require('../services/watchlist');

const router = express.Router();

// route to get all watchlists for the user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const watchlists = await getAllWatchlistsForUser(userId);
    return res.status(200).json({ watchlists });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/:watchlistId', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const watchlistId = req.params.watchlistId;
    const watchlist = await getWatchlistById(watchlistId, userId);
    return res.status(200).json({ watchlist });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

// route to add to watchlist
router.post('/:watchlistId/movies', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const watchlistId = req.params.watchlistId;
    const { movieId, movieTitle, moviePoster } = req.body;

    if (!movieId) {
      return res
        .status(400)
        .json({ message: 'please provide a valid movie id' });
    }

    if (!movieTitle) {
      return res
        .status(400)
        .json({ message: 'please provide a valid movie title' });
    }

    const watchlist = await addMovieToWatchlist(
      watchlistId,
      userId,
      movieId,
      movieTitle,
      moviePoster,
    );
    return res.status(200).json({ watchlist });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

// route to delete from watchlist
router.delete(
  '/:watchlistId/movies/:movieId',
  authenticateUser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const watchlistId = req.params.watchlistId;
      const movieId = req.params.movieId;
      const watchlist = await removeMovieFromWatchlist(
        watchlistId,
        userId,
        movieId,
      );
      return res.status(200).json({ watchlist });
    } catch (e) {
      return res.status(500).json({ message: e.toString() });
    }
  },
);

// route to create watchlist
router.post('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'please provide a valid title' });
    }
    const watchlist = await createWatchlist(title, userId);
    return res.status(200).json({ watchlist });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

// route to delete watchlist
router.delete('/:watchlistId', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const watchlistId = req.params.watchlistId;
    await deleteWatchlist(watchlistId, userId);
    return res.status(200).json({ message: 'deleted the watchlist' });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

module.exports = router;
