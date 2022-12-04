import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Login from './Login';
import SignUp from './SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;