import React, {useState} from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Sets from './components/Sets';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateNewSet from './components/CreateNewSet';
import SignUpSignIn from './components/SignUpSignIn';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='profile/create-learning-set' element={<CreateNewSet />} />
        </Routes>
        
        {/* <HeroBanner /> */}
        {/* <Sets /> */}
        {/* <CreateNewSet /> */}
        {/* <SignUp /> */}
        {/* <SignIn /> */}
        {/* <SignUpSignIn /> */}
      </Router>
    </div>
  );
}

export default App;
