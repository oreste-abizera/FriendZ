import React from "react";
import { Route } from "react-router-dom";
// import Footer from "./Footer";
import Navbar from "./Navbar";
export default function UserRoute({ children, component, rest }) {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "65vh" }}>
        {component ? (
          <Route {...rest} component={component}></Route>
        ) : (
          <Route
            {...rest}
            render={() => {
              return children;
            }}
          ></Route>
        )}
      </div>
      {/* <Footer></Footer> */}
    </>
  );
}
