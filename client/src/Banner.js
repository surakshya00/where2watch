import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg")`,
        backdropPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">Avengers</h1>
        <div className="banner__buttons">
          <button className="banner__button">Recommendations</button>
          <button className="banner__button">My List </button>
        </div>

        <div className="banner__description"></div>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
