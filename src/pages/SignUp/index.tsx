import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./style.scss";
import { AppState, SignUpPayload } from "../../types";
//redux
import { signUp } from "../../redux/actions/user";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: AppState) => state.user.error);
  const signedUp = useSelector((state: AppState) => state.user.signedUp);
  const initState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [signUpPayload, setSignUpPayload] = useState(initState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload: SignUpPayload = {
      ...signUpPayload,
      [target.name]: target.value,
    };
    setSignUpPayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUp(signUpPayload));
    setSignUpPayload(initState);
  };

  useEffect(() => {
    if (signedUp) {
      alert("Sign up successful, now you can sign in!");
      history.push("/");
    }
  }, [signedUp, history]);
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div className="signUpContainer">
      <h1>Sign Up Form</h1>
      <form className="signUpForm" onSubmit={handleSubmit}>
        <div className="signUpForm__elem">
          <label htmlFor="firstName">First name: </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={signUpPayload.firstName}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="signUpForm__elem">
          <label htmlFor="lastName">Last name: </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={signUpPayload.lastName}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="signUpForm__elem">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            name="email"
            value={signUpPayload.email}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="signUpForm__elem">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={signUpPayload.password}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button className="signUpForm__elem" type="submit">
          Sign Up
        </button>
      </form>
      <div style={{ color: "red" }}>{error[error.length - 1]}</div>
      <button onClick={handleClick}>Go back to home page</button>
    </div>
  );
}
