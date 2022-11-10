import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';

import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path='/login'
          element={<Login />}
          />
        <Route
          path='/signup'
          element={<Signup />}
          />
      </Routes>
    </div>
  );
}

export default App;
