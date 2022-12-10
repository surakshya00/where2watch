import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import MovieHome from './pages/home/MovieHome';
import Banner from './pages/banner/Banner';

function App() {
  const [loggedOut, hasLoggedOut] = useState(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MovieHome loggedOut={loggedOut} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/banner"
            element={
              <Banner hasLoggedOut={(loggedOut) => hasLoggedOut(loggedOut)} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
