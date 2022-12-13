import React, { useState, useEffect } from 'react';
import MovieDetails from '../movie-details';

import './Row.css';

const baseImgUrl = 'https://image.tmdb.org/t/p/original';

async function getMovieData(url) {
  const response = await fetch(url);
  const responseJSON = await response.json();

  if (response.status === 200) {
    return responseJSON['movies'];
  }

  throw new Error(responseJSON?.message || 'Failed to retrieve movie data');
}

function Row({ title, fetchUrl, isLargeRow }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieData(fetchUrl)
      .then((movies) => {
        setMovies(movies);
      })
      .catch((e) => {
        alert(e.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (movie.id === selectedMovie?.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {loading && <h5 className="row__loading">Loading...</h5>}
        {!loading &&
          movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              src={`${baseImgUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
      </div>
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          showCloseButton
        />
      )}
    </div>
  );
}

export default Row;
