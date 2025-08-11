import React from "react";
import "./Navbar.css";

import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-navy ">
        <a class="navbar-brand" href="../assets/logo.png">
          <img src={logo} alt="" width="80" height="80" />
        </a>
        <div className="buttons">
          <button type="button" className="btn btn-primary color-dark">
            Home
          </button>
          <button type="button" className="btn btn-primary color-dark">
            Matches
          </button>
        </div>

        <div className="ml-auto">
          <button type="button" className="btn btn-outline-light ms-3">
            Log In
          </button>
          <button type="button" className="btn btn-outline-light ms-3">
            Sign Up
          </button>
          <button type="button" className="btn btn-warning ms-3">
            Buy Now
          </button>
        </div>
      </nav>
    </div>
  );
}
