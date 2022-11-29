import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
import Tweets from "./pages/Tweets/Tweets";
import useAuthContext from "./hooks/useAuthContext";

import './App.css';
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import Profile from "./pages/Profile/Profile";
import PageNotFound from "./components/PageNotFound/PageNotFound";


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <Navbar>
        <Routes>
          <Route
            path='/'
            element={user ? <Tweets /> : <Navigate to='/signup' />}
            />
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/update-profile' />}
            />
          <Route
            path='/update-profile'
            element={user ? <UpdateProfile /> : <Navigate to='/login' />}
            />
          <Route
            path='/signup'
            element={!user ? <Signup /> : <Navigate to='/update-profile' />}
            />
          <Route
            path='/profile/:id'
            element={user ? <Profile /> : <Navigate to='/login' />}
            />
          <Route
            path='*'
            element={<PageNotFound />}
            />
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
