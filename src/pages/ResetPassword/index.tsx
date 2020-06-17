import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import "./style.scss";
import { ResetPasswordPayload, AppState } from "../../types";
//redux
import { resetPassword } from "../../redux/actions/user";

export default function ResetPassword() {
  const { resetToken } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const initState = {
    newPassword: "",
    resetToken: resetToken,
  };
  const error = useSelector((state: AppState) => state.user.error);
  const message = useSelector((state: AppState) => state.user.message);
  const [resetPasswordPayload, setResetPasswordPayload] = useState(initState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload: ResetPasswordPayload = {
      ...resetPasswordPayload,
      [target.name]: target.value,
    };
    setResetPasswordPayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(resetPasswordPayload);
    e.preventDefault();
    dispatch(resetPassword(resetPasswordPayload));
    setResetPasswordPayload(initState);
  };

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="resetPassword">
      <h2>Submit new password</h2>
      <form className="resetPassword__form" onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New password: </label>
        <input
          id="newPassword"
          type="password"
          name="newPassword"
          value={resetPasswordPayload.newPassword}
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
