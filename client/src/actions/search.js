export async function SearchMovies(searchFilters) {
  const payload = { filters: searchFilters };

  const response = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  if (response.status === 200) {
    return body['movies'];
  }

  const errorMessage = body.message || 'Failed to create new watchlist';
  throw Error(errorMessage);
}
