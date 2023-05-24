import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Home from './components/Home';
import CreateRide from './components/CreateRide';
import ProfileApp from './components/Profile';
import Login from './components/Login';
import SignUp from './components/Signup';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/createRide" element={<CreateRide/>} />
          <Route path="/profile" element={<ProfileApp/>} />
          <Route path="/login"   element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;