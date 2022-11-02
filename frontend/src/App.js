import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';

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
          path='/register'
          element={<Register />}
          />
      </Routes>
    </div>
  );
}

export default App;
