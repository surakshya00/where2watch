import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../auth/Firebase';
import './Banner.css';
import { AuthContext } from '../../providers/auth';
import { logoutUser } from '../../actions/users';

function Banner() {
  const { setUser } = useContext(AuthContext);
  const logOut = async () => {
    await logoutUser();
    await signOut(auth);
    setUser(null);
  };
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
