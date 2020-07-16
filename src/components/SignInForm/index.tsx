import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./style.scss";
import { SignInPayload, AppState } from "../../types";
//components
import GoogleSignIn from "../GoogleSignIn";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import {
  signIn,
  clearUserNoti,
  toggleDrawer,
  clearBookNoti,
} from "../../redux/actions";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
//notistack
import { useSnackbar } from "notistack";
//elemData
import { signInFormElem } from "../../ElemData/elemData";

export default function SignInForm() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const error = useSelector((state: AppState) => state.user.error);
  const isLoading = useSelector((state: AppState) => state.user.isLoading);
  const { enqueueSnackbar } = useSnackbar();
  const initState = {
    email: "",
    password: "",
  };
  const [signInPayload, setSignInPayload] = useState(initState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  useEffect(() => {
    dispatch(clearUserNoti());
    dispatch(clearBookNoti());
  }, []);

  useEffect(() => {
    if (error.length > 0)
      enqueueSnackbar(error[error.length - 1], { variant: "error" });
  }, [error]);

  return (
    <div className="signInContainer">
      <form className="signInForm" onSubmit={handleSubmit} autoComplete="off">
        {signInFormElem.map((elem) => (
          <div className="signInForm__elem" key={elem.label}>
            <TextField
              id={elem.name}
              name={elem.name}
              label={elem.label}
              type={elem.name === "password" ? "password" : "text"}
              autoComplete={elem.name === "password" ? "on" : "off"}
              value={signInPayload[elem.name]}
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
            margin: "10px",
          }}
          type="submit"
          size="small"
        >
          Sign In
        </Button>
      </form>
      <GoogleSignIn />
      {isLoading && (
        <CircularProgress size={30} className="circularProgress" style={{ color: theme.code }} />
      )}
      <Link
        to="/resetPassword"
        className="resetLink"
        style={{ color: theme.code }}
        onClick={() => dispatch(toggleDrawer("right", false))}
      >
        Forget password?
      </Link>
    </div>
  );
}
