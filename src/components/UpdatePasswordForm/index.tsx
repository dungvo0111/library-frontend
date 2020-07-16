import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";

import { UpdatePasswordPayload } from "../../types";
import "./style.scss";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import { updatePassword } from "../../redux/actions/user";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//notistack
import { useSnackbar } from "notistack";
//elemData
import { updatePasswordFormElem } from "../../ElemData/elemData";

export default function UpdatePasswordForm() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useContext(ThemeContext);
  const initState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [updatePasswordPayload, setUpdatePasswordPayload] = useState(initState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload = {
      ...updatePasswordPayload,
      [target.name]: target.value,
    };
    setUpdatePasswordPayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      updatePasswordPayload.newPassword !==
      updatePasswordPayload.confirmPassword
    ) {
      enqueueSnackbar("Confirm password must match new password", {
        variant: "error",
      });
    } else {
      const payload = { ...updatePasswordPayload };
      delete payload.confirmPassword;
      dispatch(updatePassword(payload));
      setUpdatePasswordPayload(initState);
    }
  };

  return (
    <form className="updatePasswordForm" onSubmit={handleSubmit}>
      <p className="updateProfileForm__notice" style={{ color: theme.code }}>
        *Password must be from eight characters with at least one number and one
        letter
      </p>
      {updatePasswordFormElem.map((elem) => (
        <div className="updatePasswordForm__elem" key={elem.label}>
          <TextField
            id={elem.name}
            type="password"
            name={elem.name}
            label={elem.label}
            value={updatePasswordPayload[elem.name]}
            onChange={handleChange}
            style={{ color: theme.code }}
            required
            autoComplete="on"
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
