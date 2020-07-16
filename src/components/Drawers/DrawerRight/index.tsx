import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { AppState, TokenType } from "../../../types";
//Context API
import ThemeContext, { themes } from "../../../context";
//components
import SignInForm from "../../SignInForm";
import SignUpForm from "../../SignUpForm";
//MUI
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//redux
import { toggleDrawer, signOut, clearBookNoti } from "../../../redux/actions";

export default function DrawerRight() {
  const anchorRight = "right";
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const drawers = useSelector((state: AppState) => state.ui.drawers);
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );
  let token;
  let decodedToken: TokenType;

  if (localStorage.signInToken) {
    token = localStorage.signInToken;
    decodedToken = jwtDecode<TokenType>(token);
  }

  //tabs value
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    dispatch(toggleDrawer(anchorRight, false));
  };

  const drawerList = () => (
    <div role="presentation" className="drawerList">
      <List className="drawerList__panel">
        <ListItem>
          {authenticated ? (
            <Typography variant="h6" style={{ color: theme.code }}>
              Hello, {decodedToken.firstName}
            </Typography>
          ) : (
            ""
          )}
        </ListItem>
        <IconButton onClick={() => dispatch(toggleDrawer(anchorRight, false))}>
          <ChevronRightIcon />
        </IconButton>
      </List>
      <Divider />
      {!authenticated && (
        <>
          <Paper square>
            <Tabs
              value={value}
              TabIndicatorProps={{ style: { background: theme.code } }}
              textColor="inherit"
              style={{ color: theme.code }}
              onChange={handleChange}
            >
              <Tab label="Sign In" value={1} />
              <Tab label="Sign Up" value={2} />
            </Tabs>
          </Paper>
          {value === 1 && <SignInForm />}
          {value === 2 && <SignUpForm />}
        </>
      )}
      {authenticated && (
        <List onClick={() => dispatch(toggleDrawer(anchorRight, false))}>
          <ListItem
            button
            onClick={() => {
              dispatch(clearBookNoti());
              history.push("/userProfile");
            }}
          >
            <div className="userPanel__icon">
              <SettingsIcon style={{ color: theme.code }} />
            </div>
            <ListItemText primary={"User Profile"} />
          </ListItem>
          <ListItem button onClick={() => dispatch(signOut())}>
            <div className="userPanel__icon">
              <ExitToAppIcon style={{ color: theme.code }} />
            </div>
            <ListItemText primary={"Sign Out"} />
          </ListItem>
        </List>
      )}
    </div>
  );
  return (
    <Drawer
      anchor={anchorRight}
      open={drawers[anchorRight]}
      onClose={handleClose}
    >
      {drawerList()}
    </Drawer>
  );
}
