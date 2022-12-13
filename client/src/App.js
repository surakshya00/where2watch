import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import React, { useContext } from 'react';
import './App.css';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import MovieHome from './pages/home/MovieHome';
import Watchlist from './pages/watchlist/Watchlist';
import Search from './pages/search/Search';
import { AuthProvider, AuthContext } from './providers/auth';
import WatchlistDetails from './pages/watchlist-details';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <RequireAuth>
                  <MovieHome />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/watchlist"
              element={
                <RequireAuth>
                  <Watchlist />
                </RequireAuth>
              }
            />
            <Route
              path="/watchlist/:id"
              element={
                <RequireAuth>
                  <WatchlistDetails />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/search"
              element={
                  <Search />
              }
            />
            <Route
              exact
              path="/login"
              element={
                <AuthPage>
                  <Login />
                </AuthPage>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <AuthPage>
                  <SignUp />
                </AuthPage>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AuthPage({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
