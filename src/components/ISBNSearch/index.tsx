import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./style";
import { AppState } from "../../types";
//redux
import { searchByISBN, fetchBooks } from "../../redux/actions";
//MUI
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

export default function ISBNSearch() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ISBN, setISBN] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setISBN(e.currentTarget.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (ISBN.length < 1) {
      dispatch(fetchBooks());
    } else {
      dispatch(searchByISBN(ISBN));
    }
    setISBN("");
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="search by ISBN"
          onClick={handleClick}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <InputBase
        placeholder="Search by ISBN…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
        value={ISBN}
        required
      />
    </div>
  );
}
