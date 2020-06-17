import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { SignInPayload, AppState } from "../../types";
//redux
import { signIn } from "../../redux/actions/user";

export default function SignInForm() {
  const dispatch = useDispatch();
  const userError = useSelector((state: AppState) => state.user.error);

  const initState = {
    email: "",
    password: "",
  };
  const [signInPayload, setSignInPayload] = useState(initState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload: SignInPayload = {
      ...signInPayload,
      [target.name]: target.value,
    };
    setSignInPayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(signInPayload));
    setSignInPayload(initState);
  };

  useEffect(() => {
    if (userError.length > 0) alert(userError[userError.length - 1]);
  }, [userError]);
  return (
    <div className="signInContainer">
      <form className="signInForm" onSubmit={handleSubmit}>
        <div className="signInForm__elem">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            name="email"
            value={signInPayload.email}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="signInForm__elem">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={signInPayload.password}
            onChange={handleChange}
            required={true}
            autoComplete="on"
          />
        </div>
        <button className="signInButton" type="submit">
          Sign In
        </button>
      </form>
      <div className="links">
        <a className="signUpLink" href="/signUp">
          Sign Up
        </a>
        <a className="forgetPasswordLink" href="/resetPassword">
          Forget password?
        </a>
      </div>
    </div>
  );
}