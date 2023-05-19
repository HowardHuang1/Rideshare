import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateRide from './components/CreateRide';
import ProfileApp from './components/Profile';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createRide" element={<CreateRide/>} />
          <Route path="/profile" element={<ProfileApp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;