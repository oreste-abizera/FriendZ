import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <nav className="float-left">
          <ul>
            <li>
              <a href="https://oresteabizera.netlify.app">Coderspace</a>
            </li>
            <li>
              <a href="https://creative-tim.com/presentation">About Us</a>
            </li>
            <li>
              <a href="http://blog.creative-tim.com">Blog</a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/license">Licenses</a>
            </li>
          </ul>
        </nav>
        <div className="copyright float-right">
          Copyright &copy;{" "}
          <a href="https://oresteabizera.netlify.app" target="_new">
            Coderspace
          </a>{" "}
          {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
