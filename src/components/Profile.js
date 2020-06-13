// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import authService from "../services/authService";
import {Redirect} from "react-router-dom";

const Profile = ({location}) => {
    const { user } = useAuth0();

/*    if (loading || !user) {
        return (
            <div>Loading...</div>
        );
    }*/
    let _user = authService.getCurrentUser();
console.log(_user);
if(!user && !_user)
    return <Redirect to={{pathname:"/loginf",state:{pathname:location.pathname}}} />
    return (
        <Fragment>
            <div className={"container m-4"}>
            {(user && user.picture) &&  <img style={{width:'100px',height:'100px'}} src={user.picture} alt="Profile" />}
            {(_user && !_user.photoUrl.endsWith("null.jpg")) && <img style={{width:'200px',height:'200px'}} src={ _user.photoUrl} alt="Profile" />}
            {(_user && _user.photoUrl.endsWith("null.jpg")) && <img style={{width:'200px',height:'200px'}} src={"https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"} alt="Profile" />}
          <br/>
            <FontAwesomeIcon icon="user" style={{display:'inline'}}  />
            <span>
                <b> User name :</b> {user?user.name:_user?_user.sub:"??"}</span>
            <br/>
            <FontAwesomeIcon icon="at" />
            <span style={{display:'inline'}} ><b> Email :</b> {user?user.email:_user?_user.email:"??"}</span>
            {/*<code>{JSON.stringify(user, null, 2)}</code>*/}
            </div>
        </Fragment>
    );
};

export default Profile;
