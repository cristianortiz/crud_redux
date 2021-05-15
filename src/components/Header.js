import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
      <div className="container">
        <h1>
          <Link to={"/"} className="text-light">
            CRUD - React, REDUX, REST API & Axios
          </Link>
        </h1>
      </div>
      <Link
        to={"/products/new"}
        className="btn btn-danger new-post d-block d-dm-inline-block"
      >
        Add New Product &#43;
      </Link>
    </nav>
  );
};

export default Header;
