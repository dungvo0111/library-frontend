import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./style.scss";
import { ForgetPasswordPayload, AppState } from "../../types";
//redux
import { forgetPassword, clearUserNoti } from "../../redux/actions/user";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const url = window.location.href;

  const history = useHistory();
  const initState = {
    email: "",
    url: url,
  };
  const error = useSelector((state: AppState) => state.user.error);
  const message = useSelector((state: AppState) => state.user.message);
  const [forgetPasswordPayload, setForgetPasswordPayload] = useState(initState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload: ForgetPasswordPayload = {
      ...forgetPasswordPayload,
      [target.name]: target.value,
    };
    setForgetPasswordPayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgetPassword(forgetPasswordPayload));
    setForgetPasswordPayload(initState);
  };

  const handleClick = () => {
    history.push("/");
  };

  useEffect(() => {
    dispatch(clearUserNoti());
  }, []);

  return (
    <div className="forgetPassword">
      <h2>Send reset password request</h2>
      <form className="forgetPassword__form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="text"
          name="email"
          value={forgetPasswordPayload.email}
          onChange={handleChange}
          required={true}
        />
        <button type="submit">Submit</button>
      </form>
      {message && (
        <div style={{ color: "blue" }}>{message[message.length - 1]}</div>
      )}
      {error && <div style={{ color: "red" }}>{error[error.length - 1]}</div>}
      <button onClick={handleClick}>Go back to home page</button>
    </div>
  );
}
