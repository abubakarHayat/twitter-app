import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import LoginOrSignup from './pages/LoginOrSignup/LoginOrSignup'
import Tweets from "./pages/Tweets/Tweets";
import TweetComments from "./pages/TweetComments/TweetComments";
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
            element={user ? <Tweets /> : <Navigate to='/on-board' />}
            />
          <Route
            path='/on-board'
            element={!user ? <LoginOrSignup /> : <Navigate to='/' />}
            />
          <Route
            path='/update-profile'
            element={user ? <UpdateProfile /> : <Navigate to='/on-board' />}
            />
          <Route
            path='/profile/:id'
            element={user ? <Profile /> : <Navigate to='/on-board' />}
            />
          <Route
            path='/tweet/:id'
            element={user ? <TweetComments /> : <Navigate to='/on-board' />}
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
