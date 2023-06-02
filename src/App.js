import React from 'react';
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateRide from './components/CreateRide';
import ProfileApp from './components/Profile';
import Login from './components/Login';
import SignUp from './components/Signup';

function App() {
  const [user, updateUser] = useState(null);

  return (
    user ?
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createRide" element={<CreateRide username={user}/>} />
          <Route path="/profile" element={<ProfileApp username={user} logout={updateUser}/>} />
          <Route path="/login"   element={<Login updateUsername={updateUser}/>} />
          <Route path="/signup" element={<SignUp updateUsername={updateUser}/>} />
        </Routes>
      </Router>
    </div>
    :
    <div className="app">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createRide" element={<Login updateUsername={updateUser}/>} />
        <Route path="/profile" element={<Login updateUsername={updateUser}/>} />
        <Route path="/login"   element={<Login updateUsername={updateUser}/>} />
        <Route path="/signup" element={<SignUp updateUsername={updateUser}/>} />
      </Routes>
    </Router>
  </div>
    
  );
}

export default App;