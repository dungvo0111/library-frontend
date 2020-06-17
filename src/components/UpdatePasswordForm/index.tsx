import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { UpdatePasswordPayload } from "../../types";
import "./style.scss";
//redux
import { updatePassword } from "../../redux/actions/user";

export default function UpdatePasswordForm() {
  const dispatch = useDispatch();
  const initState: UpdatePasswordPayload = {
    oldPassword: "",
    newPassword: "",
  };
  const [updatePasswordPayload, setUpdatePasswordPayload] = useState(initState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload: UpdatePasswordPayload = {
      ...updatePasswordPayload,
      [target.name]: target.value,
    };
    setUpdatePasswordPayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updatePasswordPayload);
    dispatch(updatePassword(updatePasswordPayload));
    setUpdatePasswordPayload(initState);
  };

  return (
    <form className="updatePasswordForm" onSubmit={handleSubmit}>
      <h3 className="updatePasswordForm__elem">Update Password</h3>
      <div className="updatePasswordForm__elem">
        <label htmlFor="oldPassword">Old password: </label>
        <input
          id="oldPassword"
          type="password"
          name="oldPassword"
          value={updatePasswordPayload.oldPassword}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="updatePasswordForm__elem">
        <label htmlFor="newPassword">New password: </label>
        <input
          id="newPassword"
          type="password"
          name="newPassword"
          value={updatePasswordPayload.newPassword}
          onChange={handleChange}
          required={true}
        />
      </div>
      <button className="updatePasswordForm__elem" type="submit">
        Update
      </button>
    </form>
  );
}
