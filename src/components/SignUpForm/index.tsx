import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { AppState, SignUpPayload } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import {
  signUp,
  clearUserNoti,
  signIn,
  clearBookNoti,
} from "../../redux/actions";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//notistack
import { useSnackbar } from "notistack";
//elemData
import { signUpFormElem } from "../../ElemData/elemData";

export default function SignUp() {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const error = useSelector((state: AppState) => state.user.error);
  const signedUp = useSelector((state: AppState) => state.user.signedUp);
  const initState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [signUpPayload, setSignUpPayload] = useState(initState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload = {
      ...signUpPayload,
      [target.name]: target.value,
    };
    setSignUpPayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpPayload.password !== signUpPayload.confirmPassword) {
      enqueueSnackbar("Confirm password must match password", {
        variant: "error",
      });
    } else {
      const payload = { ...signUpPayload };
      delete payload.confirmPassword;
      dispatch(signUp(payload));

    }
  };
  useEffect(() => {
    dispatch(clearUserNoti());
    dispatch(clearBookNoti());
  }, []);

  useEffect(() => {
    if (signedUp) {
      enqueueSnackbar("Signed up successfully!", { variant: "success" });
      dispatch(
        signIn({
          email: signUpPayload.email,
          password: signUpPayload.password,
        })
      );
    }
  }, [signedUp]);

  useEffect(() => {
    if (error.length > 0)
      enqueueSnackbar(error[error.length - 1], { variant: "error" });
  }, [error]);

  return (
    <div className="signUpContainer">
      <form className="signUpForm" onSubmit={handleSubmit} autoComplete="off">
        {signUpFormElem.map((elem) => (
          <div className="signUpForm__elem" key={elem.label}>
            <TextField
              id={elem.name}
              name={elem.name}
              label={elem.label}
              type={
                elem.name === "password" || elem.name === "confirmPassword"
                  ? "password"
                  : "text"
              }
              autoComplete={
                elem.name === "password" || elem.name === "confirmPassword"
                  ? "on"
                  : "off"
              }
              value={signUpPayload[elem.name]}
              onChange={handleChange}
              style={{ color: theme.code }}
              required
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}
