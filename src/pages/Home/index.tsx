import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { AppState } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//components
import Book from "../../components/Book";
import FilterForm from "../../components/FilterForm";
import Nav from "../../components/Nav";
import AddBookForm from "../../components/AddBookForm";
import AddBookPopUp from "../../components/AddBookPopUp";
//helpers
import { getDecodedToken } from "../../helpers/helperFunc";
//redux
import { clearBookNoti, clearBookBoolean } from "../../redux/actions";
//notistack
import { useSnackbar } from "notistack";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const error = useSelector((state: AppState) => state.books.error);
  const message = useSelector((state: AppState) => state.books.message);
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(clearBookBoolean());
    dispatch(clearBookNoti());
  }, []);

  useEffect(() => {
    if (localStorage.signInToken && authenticated) {
      let decodedToken = getDecodedToken();
      setIsAdmin(decodedToken.isAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [authenticated]);

  useEffect(() => {
    if (error.length > 0) {
      enqueueSnackbar(error[error.length - 1], { variant: "error" });
    }
  }, [error]);

  useEffect(() => {
    if (message.length > 0) {
      enqueueSnackbar(message[message.length - 1], { variant: "success" });
    }
  }, [message]);

  return (
    <div className="home">
      <Nav />
      <div className="home__content">
        <FilterForm />
        <Book />
        <div className="home__addBook">{isAdmin && <AddBookForm />}</div>
      </div>
      {isAdmin && (
        <div className="addIcon">
          <AddBookPopUp />
        </div>
      )}
    </div>
  );
}
