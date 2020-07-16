import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "../style";
import { AppState } from "../../../types";
//redux
import { toggleDrawer } from "../../../redux/actions";
//components
import SignInPopUp from "../../SignInPopUp";
//MUI
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import GavelIcon from "@material-ui/icons/Gavel";
import { getDecodedToken } from "../../../helpers/helperFunc";
//helpers

type NavRightPropsType = {
  name: string;
};

export default function NavRight({ name }: NavRightPropsType) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (localStorage.signInToken) {
      let decodedToken = getDecodedToken();
      setIsAdmin(decodedToken.isAdmin);
    }
  }, [authenticated]);
  
  return (
    <>
      {!authenticated && (
        <div className={classes.navRight_unauth}>
          <SignInPopUp />
        </div>
      )}

      {authenticated && (
        <div className={classes.navRight_auth}>
          <Typography variant="h6" noWrap>
            Hello, {name}
          </Typography>
          <IconButton
            aria-label="user panel"
            color="inherit"
            onClick={() => dispatch(toggleDrawer("right", true))}
          >
            {isAdmin ? <GavelIcon /> : <AccountCircle />}
          </IconButton>
        </div>
      )}

      {/* responsive nav_right */}
      {!authenticated && (
        <div className={classes.responsiveMenu_unauth}>
          <IconButton
            aria-label="sign in and sign up panel"
            color="inherit"
            onClick={() => dispatch(toggleDrawer("right", true))}
          >
            <MenuIcon />
          </IconButton>
        </div>
      )}

      {authenticated && (
        <div className={classes.responsiveMenu_auth}>
          <IconButton
            aria-label="user panel"
            color="inherit"
            onClick={() => dispatch(toggleDrawer("right", true))}
          >
            {isAdmin ? <GavelIcon /> : <AccountCircle />}
          </IconButton>
        </div>
      )}
    </>
  );
}
