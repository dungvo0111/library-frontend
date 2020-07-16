import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import "./style.scss";
import { AppState, UpdateProfilePayload, TokenType } from "../../types";

export default function UserProfile() {
  const initState: UpdateProfilePayload = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const message = useSelector((state: AppState) => state.user.message);
  const [userProfile, setUserProfile] = useState(initState);

  useEffect(() => {
    if (localStorage.signInToken) {
      const token = localStorage.signInToken;
      const decodedToken = jwtDecode<TokenType>(token);
      setUserProfile(decodedToken);
    } else {
      setUserProfile(initState);
    }
  }, [message, localStorage.signInToken]);

  return (
    <div className="userProfile">
      <div className="userProfile__elem">
        <p>First name: </p>
        <div>{userProfile.firstName}</div>
      </div>
      <div className="userProfile__elem">
        <p>Last name: </p>
        <div>{userProfile.lastName}</div>
      </div>
      <div className="userProfile__elem">
        <p>Email: </p>
        <div>{userProfile.email}</div>
      </div>
    </div>
  );
}
