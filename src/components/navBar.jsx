import React from "react";
import { Link, NavLink } from "react-router-dom";
import Nav from "./Nav";

const NavBar = () => {
/*    const  loading = useAuth0().loading;
    if (loading) {
        return (
            <div>Loading...</div>
        );
    }*/
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <b style={{fontSize:'larger',color:'cadetblue'}}>Tasks</b>
      </Link>
        <Link className="navbar-brand" to="/profile">
       My profile
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
     {/*     <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>*/}

        </div>
      </div>
        <Nav/>
    </nav>
  );
};

export default NavBar;
