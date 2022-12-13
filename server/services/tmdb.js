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
    genres,
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
    if (certification.length === 1) {
      if (certification[0] !== '') {
        params['certification'] = certification[0];
      }
    } else {
      params['certification.lte'] = certification[certification.length - 1];
      params['certification.gte'] = certification[0];
    }
  }

  // genres
  if (genres && genres.length > 0) {
    params['with_genres'] = genres.join(',');
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

async function makeTMDBRequest(url) {
  const apiResponse = await fetch(url);

  if (apiResponse.status === 200) {
    const apiJSON = await apiResponse.json();
    return apiJSON['results'];
  }

  throw 'failed to retrieve movie details';
}

async function discoverMovies(searchFilters) {
  const apiKey = getAPIKey();

  console.log(searchFilters);

  // Documentation: https://developers.themoviedb.org/3/discover/movie-discover
  let searchURL = `${BASE_URL}/discover/movie?api_key=${apiKey}`;

  const params = generateSearchParams(searchFilters);
  for (const [key, value] of Object.entries(params)) {
    searchURL += `&${key}=${encodeURIComponent(value)}`;
  }

  try {
    const movies = await makeTMDBRequest(searchURL);
    return movies;
  } catch (e) {
    throw 'failed to discover new movies';
  }
}

async function getTrendingMovies() {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/trending/movie/week?api_key=${apiKey}&language=en-US`;

  try {
    const movies = await makeTMDBRequest(searchURL);
    return movies;
  } catch (e) {
    throw 'failed to retrieve trending movies';
  }
}

async function getTopRatedMovies() {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/movie/top_rated?api_key=${apiKey}&language=en-US`;

  try {
    const movies = await makeTMDBRequest(searchURL);
    return movies;
  } catch (e) {
    throw 'failed to retrieve top rated movies';
  }
}

async function getActionMovies() {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=28`;

  try {
    const movies = await makeTMDBRequest(searchURL);
    return movies;
  } catch (e) {
    throw 'failed to retrieve top rated movies';
  }
}

async function getComedyMovies() {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=35`;

  try {
    const movies = await makeTMDBRequest(searchURL);
    return movies;
  } catch (e) {
    throw 'failed to retrieve top rated movies';
  }
}

async function getHorrorMovies() {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=27`;

  try {
    const movies = await makeTMDBRequest(searchURL);
    return movies;
  } catch (e) {
    throw 'failed to retrieve top rated movies';
  }
}

async function getRomanceMovies() {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=10749`;

  try {
    const movies = await makeTMDBRequest(searchURL);
    return movies;
  } catch (e) {
    throw 'failed to retrieve top rated movies';
  }
}

async function getDocumentaries() {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=99`;

  try {
    const movies = await makeTMDBRequest(searchURL);
    return movies;
  } catch (e) {
    throw 'failed to retrieve top rated movies';
  }
}

async function getMovieDetails(movieId) {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  const apiResponse = await fetch(searchURL);

  if (apiResponse.status === 200) {
    const apiJSON = await apiResponse.json();
    return apiJSON;
  }

  throw 'failed to retrieve movie details';
}

async function getMovieVideos(movieId) {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;

  try {
    const videos = await makeTMDBRequest(searchURL);
    return videos;
  } catch (e) {
    throw 'failed to retrieve movie videos';
  }
}

async function getMovieProviders(movieId) {
  const apiKey = getAPIKey();
  const searchURL = `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${apiKey}&language=en-US`;

  try {
    const providers = await makeTMDBRequest(searchURL);
    return providers;
  } catch (e) {
    throw 'failed to retrieve movie videos';
  }
}

module.exports = {
  discoverMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getDocumentaries,
  getMovieDetails,
  getMovieVideos,
  getMovieProviders,
};
