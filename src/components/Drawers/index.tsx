import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./style.scss";
import { Anchor, AppState, TokenType } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//components
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";
//MUI
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
//redux
import { toggleDrawer, signOut } from "../../redux/actions";
import Tab from "@material-ui/core/Tab";

interface DrawersPropsType {
  anchorDirection: Anchor;
}

export default function Drawers({ anchorDirection }: DrawersPropsType) {
  const anchorLeft = "left";
  const anchorRight = "right";
  const history = useHistory()
  const { switchTheme, theme } = useContext(ThemeContext);
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
  
  const drawerList = (anchor: Anchor) => (
    <div role="presentation" className="drawerList">
      <List className="drawerList__panel">
        <ListItem>
          {anchor === anchorLeft ? (
            <Typography variant="h6" style={{ color: theme.code }}>
              Switch themes
            </Typography>
          ) : authenticated ? (
            <Typography variant="h6" style={{ color: theme.code }}>
              Hello, {decodedToken.firstName}
            </Typography>
          ) : (
            ""
          )}
        </ListItem>
        <IconButton onClick={() => dispatch(toggleDrawer(anchor, false))}>
          {anchor === anchorLeft ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </List>
      <Divider />
      {anchor === anchorLeft && (
        <List onClick={() => dispatch(toggleDrawer(anchorLeft, false))}>
          {[themes.primary, themes.secondary, themes.third].map(
            (item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  switchTheme(item.code);
                }}
              >
                <div
                  className="drawerList__panel__themeIcon"
                  style={{ backgroundColor: item.code }}
                >
                  {item.color[0]}
                </div>
                <ListItemText primary={item.color} />
              </ListItem>
            )
          )}
        </List>
      )}
      {anchor === anchorRight && !authenticated && (
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
      {anchor === anchorRight && authenticated && (
        <List onClick={() => dispatch(toggleDrawer(anchorRight, false))}>
          <ListItem
            button
            onClick={() => (history.push("/userProfile"))}
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

  const handleClose = () => {
    dispatch(toggleDrawer(anchorDirection, false));
  };

  return (
    <Drawer
      anchor={anchorDirection}
      open={drawers[anchorDirection]}
      onClose={handleClose}
    >
      {drawerList(anchorDirection)}
    </Drawer>
  );
}
