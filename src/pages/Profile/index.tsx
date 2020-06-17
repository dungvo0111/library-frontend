import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./style.scss";
import { AppState } from "../../types";
//components
import UserProfile from "../../components/UserProfile";
import UpdateProfileForm from "../../components/UpdateProfileForm";
import UpdatePasswordForm from "../../components/UpdatePasswordForm";

export default function Profile() {
  const history = useHistory();
  const message = useSelector((state: AppState) => state.user.message);
  const error = useSelector((state: AppState) => state.user.error);
  
  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="profileContainer">
      <h1>User Profile Page</h1>
      <div className="forms">
        <UserProfile />
        <UpdateProfileForm />
        <UpdatePasswordForm />
      </div>
      {message && (
        <div style={{ color: "blue" }}>{message[message.length - 1]}</div>
      )}
      {error && <div style={{ color: "red" }}>{error[error.length - 1]}</div>}
      <button onClick={handleClick}>Go back to home page</button>
    </div>
  );
}
