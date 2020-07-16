import React, { useContext, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./style.scss";

import { AppState, BookState } from "../../types";
//context API
import ThemeContext from "../../context";
//redux
import {
  getBorrowHistory,
  clearBookBoolean,
  clearBookNoti,
} from "../../redux/actions";
//components
import BorrowBookHeader from "../BorrowBookHeader";
import ReturnBookPopUp from "../ReturnBookPopUp";
//MUI
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
//helpers
import { getDecodedToken } from "../../helpers/helperFunc";
//notistack
import { useSnackbar } from "notistack";

export default function BorrowBookList() {
  const { theme } = useContext(ThemeContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  // const error = useSelector((state: AppState) => state.books.error);
  // const message = useSelector((state: AppState) => state.books.message);
  const borrowDuration = useSelector(
    (state: AppState) => state.books.borrowDuration
  );
  const isAscending = useSelector((state: AppState) => state.ui.isAscending);
  const isReturned = useSelector((state: AppState) => state.books.isReturned);
  const borrowHistory = useSelector(
    (state: AppState) => state.user.borrowHistory
  );
  useEffect(() => {
    if (localStorage.signInToken) {
      dispatch(getBorrowHistory(getDecodedToken().userId));
      dispatch(clearBookBoolean());
    }
  }, []);
  useEffect(() => {
    if (isReturned) {
      dispatch(getBorrowHistory(getDecodedToken().userId));
    }
    dispatch(clearBookBoolean());
  }, [isReturned]);
  const [borrowList, setBorrowList] = useState(borrowHistory.borrowingBooks);

  useEffect(() => {
    let list: Partial<BookState>[];
    if (isAscending) {
      list = [...borrowHistory.borrowingBooks].sort(ascendingSort);
    } else {
      list = [...borrowHistory.borrowingBooks].sort(descendingSort);
    }
    setBorrowList(list);
  }, [borrowHistory, isAscending]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ascendingSort = (a: Partial<BookState>, b: Partial<BookState>) => {
    const nameA = a.title?.toLowerCase() as string;
    const nameB = b.title?.toLowerCase() as string;
    let score = 0;
    if (nameA > nameB) {
      score = 1;
    } else if (nameA < nameB) {
      score = -1;
    }
    return score;
  };

  const descendingSort = (a: Partial<BookState>, b: Partial<BookState>) => {
    const nameA = a.title?.toLowerCase() as string;
    const nameB = b.title?.toLowerCase() as string;
    let score = 0;
    if (nameA > nameB) {
      score = -1;
    } else if (nameA < nameB) {
      score = 1;
    }
    return score;
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const snackBarAction = (key: React.ReactText) => (
    <Fragment>
      <Button
        style={{ color: "red" }}
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        Close
      </Button>
    </Fragment>
  );

  useEffect(() => {
    if (borrowDuration > 7) {
      enqueueSnackbar(
        `The duration of your borrowing is ${borrowDuration} days, which is more than 7 days. Thus, you will be banned for 10 days soon.`,
        { variant: "warning", persist: true, action: snackBarAction }
      );
    }
  }, [borrowDuration]);

  return (
    <div className="borrowBookContainer">
      <BorrowBookHeader forBorrow={true} />
      {borrowList
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => (
          <div key={item.ISBN} className="borrowBook">
            <p className="borrowBook__ISBN">{item.ISBN}</p>
            <p className="borrowBook__title">{item.title}</p>
            <p className="borrowBook__date">
              {new Date(item.borrowedDate as Date)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </p>
            <ReturnBookPopUp
              bookISBN={item.ISBN as string}
              bookTitle={item.title as string}
              borrowList={borrowList}
            />
          </div>
        ))}
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={borrowList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
