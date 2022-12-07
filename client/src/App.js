import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import MovieHome from './MovieHome';
import Banner from './Banner';

function App() {

  const [loggedOut, hasLoggedOut] = useState(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MovieHome loggedOut = {loggedOut} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/banner" element={<Banner hasLoggedOut={(loggedOut) => hasLoggedOut(loggedOut)} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;