import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./style.scss";
import { ForgetPasswordPayload, AppState } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import { forgetPassword, clearUserNoti } from "../../redux/actions";
//components
import Nav from "../../components/Nav";
//MUI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import TextField from "@material-ui/core/TextField";
//notistack
import { useSnackbar } from "notistack";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const url = window.location.href;
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const initState = {
    email: "",
    url: url,
  };
  const error = useSelector((state: AppState) => state.user.error);
  const message = useSelector((state: AppState) => state.user.message);
  const [forgetPasswordPayload, setForgetPasswordPayload] = useState(initState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    if (error.length > 0)
      enqueueSnackbar(error[error.length - 1], { variant: "error" });
  }, [error]);

  useEffect(() => {
    if (message.length > 0)
      enqueueSnackbar(message[message.length - 1], { variant: "success" });
  }, [message]);

  return (
    <>
      <Nav />
      <div className="container">
        <div className="container__content">
          <Button
            variant="text"
            style={{
              backgroundColor: "white",
              color: theme.code,
            }}
            onClick={handleClick}
            size="small"
          >
            <KeyboardBackspaceIcon />
            <div style={{ marginLeft: "5px" }}>Home page</div>
          </Button>
          <Paper className="forgetPassword">
            <h2 className="forgetPassword__title">
              Password retrieval request
            </h2>
            <form className="forgetPassword__form" onSubmit={handleSubmit} autoComplete="off">
              <p
                className="updateProfileForm__notice"
                style={{ color: theme.code }}
              >
                *Please input your log-in email
              </p>
              <div className="forgetPassword__elem">
    
                <TextField
                  id="email"
                  type="text"
                  name="email"
                  label="Email"
                  value={forgetPasswordPayload.email}
                  onChange={handleChange}
                  style={{ color: theme.code }}
                  required
                />
              </div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: theme.code,
                }}
                type="submit"
                size="small"
              >
                Submit
              </Button>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
}
