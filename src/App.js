import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateRide from './components/CreateRide';
import Dashboard from './components/Dashboard';
import Tesla from './Tesla.jpeg'

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/createRide" component={CreateRide} />
          <Route path="/dashboard" component={Dashboard} />
        </Routes>
      </Router>
      <div className="container">
          <img src={Tesla} alt="tesla" />
      </div>
    </div>
  );
}

export default App;