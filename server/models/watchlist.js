const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movies: { type: Array, default: [] },
  isPublic: { type: Boolean, default: false },
});

const WatchlistModel = mongoose.model('Watchlist', WatchlistSchema);

module.exports = WatchlistModel;
