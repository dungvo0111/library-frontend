import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./style.scss";
import { UpdateProfilePayload } from "../../types";
//redux
import { updateProfile } from "../../redux/actions/user";

export default function UpdateProfileForm() {
  const dispatch = useDispatch();
  const initState: UpdateProfilePayload = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const [updateProfilePayload, setUpdateProfilePayload] = useState(initState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload: UpdateProfilePayload = {
      ...updateProfilePayload,
      [target.name]: target.value,
    };
    setUpdateProfilePayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updateProfilePayload);
    dispatch(updateProfile(updateProfilePayload));
    setUpdateProfilePayload(initState);
  };

  return (
    <form className="updateProfileForm" onSubmit={handleSubmit}>
      <h3 className="updateProfileForm__elem">Update Profile</h3>
      <div className="updateProfileForm__elem">
        <label htmlFor="firstName">First name: </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={updateProfilePayload.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="updateProfileForm__elem">
        <label htmlFor="lastName">Last name: </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={updateProfilePayload.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="updateProfileForm__elem">
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="text"
          name="email"
          value={updateProfilePayload.email}
          onChange={handleChange}
        />
      </div>
      <button className="updateProfileForm__elem" type="submit">
        Update
      </button>
    </form>
  );
}
