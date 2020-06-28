import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <NavbarWrapper>
      <nav className="material-navbar material-navbar-expand material-navbar-transparent material-navbar-absolute fixed-top ">
        <div className="container-fluid">
          <div className="material-navbar-wrapper">
            <Link to="/" className="material-navbar-brand">
              <b className="font-weight-bolder">F r i e n d</b> Z
            </Link>
          </div>
          <div>
            <ul className="material-navbar-material-nav">
              <li className="material-nav-item">
                <Link to="/login" className="material-nav-link text-white">
                  Sign in
                </Link>
              </li>
              <li className="material-nav-item">
                <Link className="material-nav-link text-white" to="/issues">
                  Have an issue?
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.div``;
