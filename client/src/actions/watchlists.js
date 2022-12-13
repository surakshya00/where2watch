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
    return body['user'];
  }

  const errorMessage = body.message || 'Failed to create new watchlist';
  throw Error(errorMessage);
}
