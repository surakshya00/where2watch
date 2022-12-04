const WatchlistModel = require('../models/watchlist');

async function getAllWatchlistsForUser(userId) {
  return WatchlistModel.find({ owner: userId }).populate('owner');
}

async function getWatchlistById(watchlistId, userId) {
  const watchlist = await WatchlistModel.findById(watchlistId).populate(
    'owner',
  );
  if (!watchlist) {
    throw new Error('no watchlist found');
  }

  console.log(watchlist);

  if (watchlist.owner.id !== userId) {
    throw new Error('user is not the owner of the watchlist');
  }

  return watchlist;
}

async function createWatchlist(title, userId) {
  const isExistingWatchlist = await WatchlistModel.exists({
    title: title,
    owner: userId,
  });

  if (isExistingWatchlist) {
    throw new Error('Watchlist already exists');
  }

  const newWatchlist = await WatchlistModel.create({
    title: title,
    owner: userId,
  });
  return newWatchlist;
}

async function deleteWatchlist(watchlistId, userId) {
  const watchlistToDelete = await getWatchlistById(watchlistId, userId);
  return watchlistToDelete.remove();
}

async function addMovieToWatchlist(
  watchlistId,
  userId,
  movieId,
  movieTitle,
  moviePoster,
) {
  const watchlist = await getWatchlistById(watchlistId, userId);

  const existingMovies = watchlist.movies || [];

  const payload = { movieId, movieTitle, moviePoster };

  // upsert movie info to watchlist
  const movieIndex = existingMovies.findIndex((x) => x.movieId === movieId);
  if (movieIndex === -1) {
    existingMovies.push(payload);
  } else {
    existingMovies[movieIndex] = payload;
  }

  watchlist.movies = existingMovies;
  await watchlist.save();
}

async function removeMovieFromWatchlist(watchlistId, userId, movieId) {
  const watchlist = await getWatchlistById(watchlistId, userId);
  const existingMovies = watchlist.movies || [];
  watchlist.movies = existingMovies.filter((x) => x.movieId !== movieId);
  await watchlist.save();
}

module.exports = {
  createWatchlist,
  getAllWatchlistsForUser,
  getWatchlistById,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  deleteWatchlist,
};
