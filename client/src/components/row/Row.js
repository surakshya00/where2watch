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

function Row({ title, fetchUrl, isLargeRow }) {
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
    getMovieData(fetchUrl)
      .then((movies) => {
        setMovies(movies);
      })
      .catch((e) => {
        alert(e.toString());
      });
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`,
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
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
