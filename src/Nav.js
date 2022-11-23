import React from 'react';
import './Nav.css'

function Nav() {
    return (
        <header
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg")`,
            backdropPosition: "center center",
          }}
        >

          <div className="banner__contents">
            <h1 className="banner__title">
              Avengers
            </h1>
            <div className="banner__buttons">
              <button className="banner__button">Recommendations</button>
              <button className="banner__button">My List </button>
            </div>

            <h1 className="banner__description"></h1>
          </div>
          <div className="banner__fadeBottom" />
        </header>
      );
    }
    

export default Nav