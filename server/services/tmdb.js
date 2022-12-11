const fetch = require('cross-fetch');

const BASE_URL = 'https://api.themoviedb.org/3';

function getAPIKey() {
  const apiKey = process.env.TMBD_API_KEY;
  if (apiKey === '') {
    throw 'TMBD API key not found';
  }
  return apiKey;
}

function generateSearchParams(searchFilters) {
  const params = {};

  // setup basic params
  params['language'] = 'en-US';

  // exclude adult movies
  params['include_adult'] = false;

  // include videos
  params['include_video'] = true;

  // setup user passed params
  const {
    page,
    certification,
    minReleaseYear,
    maxReleaseYear,
    minRatings,
    maxRatings,
    sortOrder,
    sortBy,
  } = searchFilters;

  // sorting
  if (sortBy && sortOrder) {
    params['sort_by'] = sortBy + '.' + sortOrder;
  } else {
    params['sort_by'] = 'popularity.desc';
  }

  // pagination
  if (page) {
    params['page'] = page;
  }

  // certification
  if (certification) {
    params['certification_country'] = 'US';
    if (certification.length == 1) {
      params['certification'] = certification;
    } else {
      params['certification.lte'] = certification[certification.length - 1];
      params['certification.gte'] = certification[0];
    }
  }

  // release year
  if (minReleaseYear) {
    params['primary_release_date.gte'] = minReleaseYear;
  }
  if (maxReleaseYear) {
    params['primary_release_date.lte'] = maxReleaseYear;
  }

  // ratings
  if (minRatings) {
    params['vote_average.gte'] = minRatings;
  }
  if (maxRatings) {
    params['vote_average.lte'] = maxRatings;
  }

  return params;
}

async function discoverMovies(searchFilters) {
  const apiKey = getAPIKey();

  // Documentation: https://developers.themoviedb.org/3/discover/movie-discover
  let searchURL = `${BASE_URL}/discover/movie?api_key=${apiKey}`;

  params = generateSearchParams(searchFilters);
  for (const [key, value] of Object.entries(object)) {
    searchURL += `&${key}=${encodeURIComponent(value)}`;
  }

  const apiResponse = await fetch(searchURL);

  if (apiResponse.status === 200) {
    const apiJSON = await apiResponse.json();
    return apiJSON['results'];
  }

  throw 'failed to discover new movies';
}

async function getTrendingMovies() {
  const apiKey = getAPIKey();

  let searchURL = `${BASE_URL}/trending/movie/week?api_key=${apiKey}&language=en-US`;

  const apiResponse = await fetch(searchURL);

  if (apiResponse.status === 200) {
    const apiJSON = await apiResponse.json();
    return apiJSON['results'];
  }

  throw 'failed to retrieve trending movies';
}

module.exports = {
  discoverMovies,
  getTrendingMovies,
};
