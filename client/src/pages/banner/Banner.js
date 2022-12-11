import React, { useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../auth/Firebase';
import { Navigate } from 'react-router-dom';
import './Banner.css';

function Banner({ hasLoggedOut }) {
  const logOut = async () => {
    await signOut(auth);
    hasLoggedOut(true);
  };

  const [user, setUser] = useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

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
          <button className="banner__button">My List </button>
          <button className="banner__button" onClick={logOut}>
            Log Out
          </button>
        </div>

        <div className="banner__description"></div>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
