import React from "react";
import LeftLinks from "../Navbar/LeftLinks";
import SearchForm from "../Navbar/SearchForm";
import RightLinks from "../Navbar/RightLinks";

export default function SecuredNavbar() {
  return (
    // < !--Navbar -- >
    <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom">
      <LeftLinks></LeftLinks>
      <SearchForm></SearchForm>
      <RightLinks></RightLinks>
    </nav>
  );
}
