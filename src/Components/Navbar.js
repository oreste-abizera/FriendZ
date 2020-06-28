import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <NavbarWrapper>
      <nav className="navbar navbar-expand navbar-transparent navbar-absolute fixed-top ">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <Link to="/" className="navbar-brand">
              <b className="font-weight-bolder">F r i e n d</b> Z
            </Link>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/issues">
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
