import useSWR from 'swr';

import { fetcher } from './utils';

export async function GetWatchlists() {
  const { data, error } = useSWR(`/api/watchlists`, fetcher);

  return {
    watchlists: data?.watchlists,
    isLoading: true,
    error: error,
  };
}

export async function CreateWatchlist(watchlistName) {
  const payload = { title: watchlistName };

  const response = await fetch('/api/watchlists', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  if (response.status === 200) {
    return body['watchlist'];
  }

  const errorMessage = body.message || 'Failed to create new watchlist';
  throw Error(errorMessage);
}

export async function DeleteWatchlist(watchlistId) {
  const response = await fetch(`/api/watchlists/${watchlistId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  if (response.status === 200) {
    return body['message'];
  }

  const errorMessage = body.message || 'Failed to create new watchlist';
  throw Error(errorMessage);
}

export async function AddToWatchlist(watchlistId, movie) {
  const payload = {
    movieId: movie.id,
    movieTitle: movie.title,
    moviePoster: movie.poster_path,
  };

  const response = await fetch(`/api/watchlists/${watchlistId}/movies`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  if (response.status === 200) {
    return body['watchlist'];
  }

  const errorMessage = body.message || 'Failed to create new watchlist';
  throw Error(errorMessage);
}

export async function RemoveFromWatchlist(watchlistId, movieId) {
  const response = await fetch(
    `/api/watchlists/${watchlistId}/movies/${movieId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const body = await response.json();

  if (response.status === 200) {
    return body['watchlist'];
  }

  const errorMessage = body.message || 'Failed to create new watchlist';
  throw Error(errorMessage);
}
