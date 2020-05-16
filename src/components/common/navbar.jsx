import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

function Navbar({ home, links, selectedLink }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to={home.address} className="navbar-brand">
        {home.label}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink to={link.address} className="nav-item nav-link">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

const linkShape = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

Navbar.propTypes = {
  home: PropTypes.shape(linkShape).isRequired,
  links: PropTypes.arrayOf(PropTypes.shape(linkShape)).isRequired,
  selectedLink: PropTypes.shape(linkShape).isRequired,
};

export default Navbar;
