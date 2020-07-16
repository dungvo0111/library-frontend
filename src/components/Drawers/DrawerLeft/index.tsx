import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { AppState } from "../../../types";
//Context API
import ThemeContext, { themes } from "../../../context";
//MUI
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//redux
import { toggleDrawer } from "../../../redux/actions";

export default function DrawerLeft() {
  const anchorLeft = "left";
  const { switchTheme, theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );
  const drawers = useSelector((state: AppState) => state.ui.drawers);

  const handleClose = () => {
    dispatch(toggleDrawer(anchorLeft, false));
  };

  const drawerList = () => (
    <div role="presentation" className="drawerList">
      <List className="drawerList__panel">
        <ListItem>
          <Typography variant="h6" style={{ color: theme.code }}>
            Switch themes
          </Typography>
        </ListItem>
        <IconButton onClick={() => dispatch(toggleDrawer(anchorLeft, false))}>
          <ChevronLeftIcon />
        </IconButton>
      </List>
      <Divider />
      <List onClick={() => dispatch(toggleDrawer(anchorLeft, false))}>
        {[themes.primary, themes.secondary, themes.third].map((item, index) => (
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
        ))}
      </List>
    </div>
  );
  return (
    <Drawer
      anchor={anchorLeft}
      open={drawers[anchorLeft]}
      onClose={handleClose}
    >
      {drawerList()}
    </Drawer>
  );
}
