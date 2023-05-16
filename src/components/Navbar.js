import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {
  return (
    <div className="header__wrapper">
      <nav>
          <div className="menuItems">
              <div className="left-items">
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                <NavLink to="/createRide" activeClassName="active">Create Ride</NavLink>
              </div>
              <div className="right-items">
                <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
              </div>
          </div>
      </nav>
    </div>
  );
};

export default Navbar;