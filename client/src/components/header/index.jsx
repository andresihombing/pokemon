import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <h2 className="navbar-brand pe-none" onClick={() => navigate("/")}>
          Pokemon
        </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-light" onClick={() => navigate("/")}>
                Pokemon List
              </button>
            </li>
            <li className="nav-item ms-4">
              <button
                className="btn btn-light"
                onClick={() => navigate("/my-pokemon")}
              >
                My Pokemon
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
