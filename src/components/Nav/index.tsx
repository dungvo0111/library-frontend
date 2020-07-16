import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import useStyles from "./style";
import { AppState, TokenType } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import {
  fetchBooks,
  signOut,
  setAuthenticated,
  toggleDrawer,
} from "../../redux/actions";
//components
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import DrawerLeft from "../Drawers/DrawerLeft";
import DrawerRight from "../Drawers/DrawerRight";
//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//notistack
import { useSnackbar } from "notistack";
//helpers
import { getDecodedToken } from "../../helpers/helperFunc";

export default function Nav() {
  const classes = useStyles();
  const anchorRight = "right";
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { theme } = useContext(ThemeContext);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );

  const snackBarAction = (key: React.ReactText) => (
    <Fragment>
      <Button
        style={{ color: "red" }}
        onClick={() => {
          history.push("/userProfile");
          closeSnackbar(key);
        }}
      >
        Change
      </Button>
    </Fragment>
  );
  //default-password-warning snackbar key
  let key: React.ReactText;

  useEffect(() => {
    if (localStorage.signInToken) {
      let decodedToken = getDecodedToken();
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(signOut());
      } else {
        dispatch(setAuthenticated());
        dispatch(toggleDrawer(anchorRight, false));
        setUserName(decodedToken.firstName);
        if (decodedToken.password) {
          key = enqueueSnackbar(
            `Hi ${decodedToken.firstName}, we created a new account on our website for you with the Google email.`,
            { variant: "info" }
          );
          enqueueSnackbar(
            `The current password of this account is abcd1234. You may need to change it here`,
            {
              variant: "warning",
              persist: true,
              action: snackBarAction,
            }
          );
        }
      }
    } else {
      closeSnackbar(key);
    }
  }, [localStorage.signInToken, authenticated]);

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        style={{ backgroundColor: theme.code, padding: "10px 0" }}
      >
        <Toolbar className={classes.nav}>
          <NavLeft />
          <NavRight name={userName} />
        </Toolbar>
      </AppBar>

      <DrawerLeft />
      <DrawerRight />
    </div>
  );
}
