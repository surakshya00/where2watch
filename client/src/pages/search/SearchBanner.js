import React, { useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../auth/Firebase';
import './SearchBanner.css';
import { AuthContext } from '../../providers/auth';
import { logoutUser } from '../../actions/users';

function SearchBanner() {
  const { setUser } = useContext(AuthContext);
  const logOut = async () => {
    await signOut(auth);
    await logoutUser();
    setUser(null);
  };

  const {keyword, setKeyword} = useState("");
  const {genre, setGenre} = useState("");
  const {minYear, setMinYear} = useState("");
  const {maxYear, setMaxYear} = useState("");
  const {minRatings, setMinRatings} = useState("");
  const {maxRatings, setMaxRatings} = useState("");
  const {certifications, setCertifications} = useState("");
  const {sortOrder, setSortOrder} = useState("");
  const {sortBy, setSortBy} = useState("");

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
        <h1 className="banner__title">Search</h1>
        <div className="banner__buttons">
        <button className="banner__button">My List </button>
        <button className="banner__button" onClick={logOut}>
            Log Out
        </button>
        </div>

        <div className="filter_details">
            <div>
                <h4 className="keyword">KeyWord:</h4>
                <input
                    className="keyword"
                    type="text"
                    placeholder="Keyword"
                    onChange={(event) => {
                        setKeyword(event.target.value);
                    }}
                />
            </div>
            <div>
                <h4>Genre:</h4>
                <br></br>
                <input
                    className='genre'
                    type="text"
                    placeholder="Genre"
                    onChange={(event) => {
                        setGenre(event.target.value);
                    }}
                />
            </div>
            <div>
                <h4 className="name">Release Year:</h4>
                <input
                    className="minyear"
                    type="text"
                    placeholder="minimum release year"
                    onChange={(event) => {
                        setMinYear(event.target.value);
                    }}
                />-

                <input
                    className="maxyear"
                    type="text"
                    placeholder="maximum release year"
                    onChange={(event) => {
                        setMaxYear(event.target.value);
                    }}
                />
            </div>
            <div>
                <h4 className="name">Ratings:</h4>
                <input
                    className="minrate"
                    type="text"
                    placeholder="minimum ratings"
                    onChange={(event) => {
                        setMinRatings(event.target.value);
                    }}
                />- 

                <input
                    className="maxrate"
                    type="text"
                    placeholder="maximum ratings"
                    onChange={(event) => {
                        setMaxRatings(event.target.value);
                    }}
                />
            </div>
        </div>

        <div className="next_filters">
            <div>
                <label type="button" data-toggle="dropdown">
                <h4 className="certifications">Certifications</h4>
                </label>
                <select 
                className="certifications"
                onChange={(event) => {
                    setCertifications(event.target.value);
                }}>
                    <option value="g">g</option>
                    <option value="pg">pg</option>
                    <option value="pg-13">pg-13</option>
                    <option value="r">r</option>
                    <option value="nc-19">nc-19</option>
                </select>
            </div>
            <div>
                <label type="button" data-toggle="dropdown">
                <h4 className="sortby">Sory by:</h4>
                </label>
                <select 
                className="sortby"
                onChange={(event) => {
                    setSortBy(event.target.value);
                }}>
                    <option value="popularity">popularity</option>
                    <option value="ratings">ratings</option>
                </select>
            </div>
            <div>
                <label type="button" data-toggle="dropdown">
                <h4 className="sortorder">Sort Order:</h4>
                </label>
                <select 
                className="sortorder"
                onChange={(event) => {
                    setSortOrder(event.target.value);
                }}>
                    <option value="ascending">ascending</option>
                    <option value="descending">descending</option>
                </select>
            </div>
            <div>
                <button className="results">Show Results </button>
            </div>
        </div>
        
        <div className="banner__description"></div>
    </div>
    <div className="banner__fadeBottom" />
    </header>
  );
}

export default SearchBanner;
