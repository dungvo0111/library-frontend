import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import "./style.scss";
import { ResetPasswordPayload, AppState } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import { resetPassword } from "../../redux/actions/user";
//MUI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
//notistack
import { useSnackbar } from "notistack";
//elemData
import { resetPasswordFormElem } from "../../ElemData/elemData";

export default function ResetPassword() {
  const { resetToken } = useParams();
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const initState = {
    newPassword: "",
    confirmPassword: "",
    resetToken: resetToken,
  };

  const error = useSelector((state: AppState) => state.user.error);
  const message = useSelector((state: AppState) => state.user.message);
  const [resetPasswordPayload, setResetPasswordPayload] = useState(initState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newPayload = {
      ...resetPasswordPayload,
      [target.name]: target.value,
    };
    setResetPasswordPayload(newPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      resetPasswordPayload.newPassword !== resetPasswordPayload.confirmPassword
    ) {
      enqueueSnackbar("Confirm password must match new password", {
        variant: "error",
      });
    } else {
      const payload: ResetPasswordPayload = {
        newPassword: resetPasswordPayload.newPassword,
        resetToken: resetPasswordPayload.resetToken,
      };
      dispatch(resetPassword(payload));
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      enqueueSnackbar(error[error.length - 1], { variant: "error" });
    }
  }, [error]);

  useEffect(() => {
    if (message.length > 0) {
      enqueueSnackbar(message[message.length - 1], { variant: "success" });
      setTimeout(() => history.push("/"), 3000);
    }
  }, [message]);

  return (
    <div className="container">
      <Paper className="resetPassword" elevation={3}>
        <h2>Submit new password</h2>
        <form className="resetPassword__form" onSubmit={handleSubmit}>
          {resetPasswordFormElem.map((elem) => (
            <div className="resetPassword__elem" key={elem.label}>
              <TextField
                id={elem.name}
                name={elem.name}
                label={elem.label}
                type="password"
                autoComplete="on"
                value={resetPasswordPayload[elem.name]}
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
            }}
            type="submit"
            size="small"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}
