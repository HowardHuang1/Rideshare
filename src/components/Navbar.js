import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {
  return (
    <div className="header__wrapper">
    <nav>
        <div className="menuItems">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/createRide" activeClassName="active">Create Ride</NavLink>
            <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
        </div>
    </nav>
    </div>
  );
};

export default Navbar;