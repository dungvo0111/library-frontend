import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { AppState } from "../../types";
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
import { clearBookNoti, borrowBook, fetchBooks } from "../../redux/actions";

type BorrowBookPropsType = {
  bookISBN: string;
  bookTitle: string;
};

export default function BorrowBookPopUp({
  bookISBN,
  bookTitle,
}: BorrowBookPropsType) {
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );
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
    setOpen(true);
  };

  const handleBorrow = (ISBN: string) => {
    const returnedDate = new Date(new Date().setDate(new Date().getDate() + 7));
    dispatch(borrowBook(ISBN, { returnedDate: returnedDate }));
    setOpen(false);
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
        Borrow
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="borrow book confirmation"
      >
        <DialogTitle>{`Do you wish to borrow "${bookTitle}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            At the moment, borrowing duration is 7 days. Late return will result
            in your account being banned for 10 days.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: theme.code }} autoFocus>
            No
          </Button>
          <Button
            onClick={() => handleBorrow(bookISBN)}
            style={{ color: theme.code }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
