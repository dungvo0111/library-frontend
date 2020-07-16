import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory, Link } from "react-router-dom";

import useStyles from "../style";
import { ANCHOR_LEFT } from "../../../types";
//components
import ISBNSearch from "../../ISBNSearch";
//MUI
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
//Context API
import ThemeContext, { themes } from "../../../context";
//redux
import { fetchBooks, toggleDrawer, clearAllFilters, clearBookNoti } from "../../../redux/actions";

export default function NavLeft() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const showAllBooks = () => {
    dispatch(fetchBooks());
    dispatch(clearAllFilters());
    dispatch(clearBookNoti());
  };

  return (
    <div className={classes.navLeft}>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={() => dispatch(toggleDrawer(ANCHOR_LEFT, true))}
      >
        <MenuIcon />
      </IconButton>
      <Link
        to="/"
        style={{ textDecoration: "none", color: "white", marginLeft: "20px" }}
      >
        <Typography className={classes.title} variant="h5" noWrap>
          DV Online Library
        </Typography>
      </Link>
      {location.pathname === "/" && <ISBNSearch />}
      {location.pathname === "/" && (
        <Button
          variant="contained"
          style={{ backgroundColor: theme.code, color: "white" }}
          onClick={showAllBooks}
          size="small"
        >
          Show all
        </Button>
      )}
    </div>
  );
}
