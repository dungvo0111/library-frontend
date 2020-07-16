import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { AppState, BookState, ISBN } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//MUI
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
//redux
import {
  clearBookNoti,
  borrowBook,
  fetchBooks,
  returnBook,
} from "../../redux/actions";

type BorrowBookPropsType = {
  bookISBN: string;
  bookTitle: string;
  borrowList: Partial<BookState>[];
};

export default function ReturnBookPopUp({
  bookISBN,
  bookTitle,
  borrowList,
}: BorrowBookPropsType) {
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );
  const borrowHistory = useSelector(
    (state: AppState) => state.user.borrowHistory
  );
  const isReturned = useSelector((state: AppState) => state.books.isReturned);
  const { theme } = useContext(ThemeContext);
  //Popup open state
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(false);
  }, [authenticated]);

  //popup close
  const handleClose = () => {
    dispatch(clearBookNoti());
    setOpen(false);
  };

  //popup open
  const handleClickOpen = () => {
    dispatch(clearBookNoti());
    setOpen(true);
  };

  const handleReturn = (ISBN: string) => {
    const returnedDate = new Date();
    const borroweddate = borrowList.filter((item) => item.ISBN === bookISBN)[0]
      .borrowedDate as Date;
    const duration = dayCalculation(returnedDate, borroweddate);
    dispatch(returnBook(ISBN, { returnedDate: returnedDate }, duration));
    setOpen(false);
  };

  const dayCalculation = (returnedDate: Date, borrowedDate: Date) => {
    const timeDifference = Math.round(
      returnedDate.getTime() - new Date(borrowedDate).getTime()
    );
    const dayDifference = Math.round(timeDifference / (1000 * 3600 * 24));
    return dayDifference;
  };

  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: "white",
          color: theme.code,
          marginRight: "10px",
        }}
        size="small"
        onClick={handleClickOpen}
      >
        Return
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="return book confirmation"
      >
        <DialogTitle>{`Do you wish to return "${bookTitle}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please confirm your action.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: theme.code }} autoFocus>
            No
          </Button>
          <Button
            onClick={() => handleReturn(bookISBN)}
            style={{ color: theme.code }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
