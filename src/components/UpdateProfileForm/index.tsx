import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";

import "./style.scss";
import { UpdateProfilePayload } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import { updateProfile } from "../../redux/actions/user";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//elemData
import { updateProfileFormElem } from "../../ElemData/elemData";

export default function UpdateProfileForm() {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const initState: UpdateProfilePayload = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const [updateProfilePayload, setUpdateProfilePayload] = useState(initState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload: UpdateProfilePayload = {
      ...updateProfilePayload,
      [target.name]: target.value,
    };
    setUpdateProfilePayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile(updateProfilePayload));
  };

  return (
    <form className="updateProfileForm" onSubmit={handleSubmit}>
      <p className="updateProfileForm__notice" style={{ color: theme.code }}>
        *Input to the fields you wish to change
      </p>
      {updateProfileFormElem.map((elem) => (
        <div className="updateProfileForm__elem" key={elem.label}>
          <TextField
            id={elem.name}
            name={elem.name}
            label={elem.label}
            value={updateProfilePayload[elem.name]}
            onChange={handleChange}
            style={{ color: theme.code }}
          />
        </div>
      ))}
      <Button
        variant="contained"
        style={{
          backgroundColor: "white",
          color: theme.code,
          marginTop: "10px",
        }}
        type="submit"
        size="small"
      >
        Update
      </Button>
    </form>
  );
}
