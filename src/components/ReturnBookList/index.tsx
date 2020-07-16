import React, { useContext, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uuid } from "uuidv4";

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
//MUI
import CircularProgress from "@material-ui/core/CircularProgress";
import TablePagination from "@material-ui/core/TablePagination";
import BorrowBookPopUp from "../BorrowBookPopUp";
//helpers
import { getDecodedToken } from "../../helpers/helperFunc";
//notistack
import { useSnackbar } from "notistack";

export default function ReturnBookList() {
  const { theme } = useContext(ThemeContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const borrowDuration = useSelector(
    (state: AppState) => state.books.borrowDuration
  );
  const isAscending = useSelector((state: AppState) => state.ui.isAscending);
  const isBorrowed = useSelector((state: AppState) => state.books.isBorrowed);
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

  const [returnList, setReturnList] = useState(borrowHistory.returnedBooks);

  useEffect(() => {
    let list: Partial<BookState>[];
    if (isAscending) {
      list = [...borrowHistory.returnedBooks].sort(ascendingSort);
    } else {
      list = [...borrowHistory.returnedBooks].sort(descendingSort);
    }
    setReturnList(list);
  }, [borrowHistory, isAscending, isBorrowed, isReturned]);

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

  return (
    <div className="borrowBookContainer">
      <BorrowBookHeader forBorrow={false} />
      {returnList
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => (
          <div key={uuid()} className="borrowBook">
            <p className="borrowBook__ISBN">{item.ISBN}</p>
            <p className="borrowBook__title">{item.title}</p>
            <p className="borrowBook__date">
              {new Date(item.returnedDate as Date)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </p>
            <BorrowBookPopUp
              bookISBN={item.ISBN as string}
              bookTitle={item.title as string}
            />
          </div>
        ))}
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={returnList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
