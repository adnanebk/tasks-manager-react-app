// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import {getCurrentUser,logout} from "../services/authService";
import {Link} from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
const Nav = () => {
    const { isAuthenticated, logout:logoutAuth0,user,loginWithRedirect} = useAuth0();
    const _user=getCurrentUser();
    return (

        <div>

            {(isAuthenticated || _user) && <b className="alert alert-success">Hi , {isAuthenticated?user.name:_user?_user.sub:""}</b>}

            {(!isAuthenticated && !_user) &&  <ButtonGroup color="primary" variant="contained" size="medium" aria-label="small contained button group">

                <Link  to={"/loginf"}> <Button>Login with jwt</Button></Link>
                <Button onClick={()=>loginWithRedirect({})}>Login with Auth0</Button>

            </ButtonGroup>}
            {isAuthenticated && <button className={"btn btn-warning"} onClick={() => logoutAuth0()}>Logout</button>}
            {_user && <button className={"btn btn-warning"} onClick={() => logout()}>Logout</button>}

            </div>
    );
};

export default Nav;
