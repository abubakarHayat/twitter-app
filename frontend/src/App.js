import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
import useAuthContext from "./hooks/useAuthContext";

import './App.css';
import Profile from "./pages/Profile/Profile";


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/profile' />}
          />
        <Route
          path='/profile'
          element={user ? <Profile /> : <Navigate to='/login' />}
          />
        <Route
          path='/signup'
          element={!user ? <Signup /> : <Navigate to='/profile' />}
          />
      </Routes>
    </div>
  );
}

export default App;
