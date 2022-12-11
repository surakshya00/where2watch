import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Row.css';
import Youtube from 'react-youtube';

const baseImgUrl = 'https://image.tmdb.org/t/p/original';

async function getMovieData(url) {
  const response = await fetch(url);
  const responseJSON = await response.json();

  if (response.status === 200) {
    return responseJSON['movies'];
  }

  throw new Error(responseJSON?.message || 'Failed to retrieve movie data');
}

async function getMovieVideos(movieId) {
  const response = await fetch(`/api/movies/${movieId}/videos`);
  const responseJSON = await response.json();

  if (response.status === 200) {
    return responseJSON['videos'];
  }

  throw new Error(responseJSON?.message || 'Failed to retrieve movie videos');
}

function Row({ title, fetchUrl, isLargeRow }) {
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [movies, setMovies] = useState([]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

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

  const handleClick = async (movie) => {
    setTrailerUrl('');
    getMovieVideos(movie.id).then((videos) => {
      const trailers = videos.filter((x) => x.type === 'Trailer');
      if (trailers.length > 0) {
        setTrailerUrl(trailers[0].key);
      }
    });
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
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
