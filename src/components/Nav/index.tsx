import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import "./style.scss";
import { AppState, TokenType } from "../../types";
//redux
import { fetchBooks, signOut, setAuthenticated } from "../../redux/actions";
//components
import ISBNSearch from "../ISBNSearch";
import SignInForm from "../SignInForm";
import GoogleSignIn from "../GoogleSignIn";

export default function Nav() {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );

  const handleClick = () => {
    dispatch(fetchBooks());
  };

  useEffect(() => {
    if (localStorage.signInToken) {
      const token = localStorage.signInToken;
      const decodedToken = jwtDecode<TokenType>(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(signOut());
      } else {
        dispatch(setAuthenticated());
        setUserName(decodedToken.firstName);
        if (decodedToken.password) {
          alert(
            `Hi ${decodedToken.firstName}, your current password for this site is abcd1234. You may need to change your password once you sign in!`
          );
        }
      }
    }
  }, [localStorage.signInToken]);

  const handleSignOut = () => {
    localStorage.removeItem("signInToken");
    dispatch(signOut());
  };
  return (
    <div className="nav">
      <div className="nav__left">
        <ISBNSearch />
        <button onClick={handleClick}>Show all book</button>
      </div>
      {!authenticated && (
        <div className="nav__right">
          <SignInForm />
          <GoogleSignIn />
        </div>
      )}
      {authenticated && (
        <div className="nav__right">
          <a href="/userProfile">{userName}</a>
          <button style={{ marginLeft: "10px" }} onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
