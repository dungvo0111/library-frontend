import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { AppState } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//MUI
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
//redux
import {
  clearBookNoti,
  deleteBook,
  fetchBooks,
  filterByQuery,
} from "../../redux/actions";

type DeleteBookPropsType = {
  bookTitle: string;
  bookISBN: string;
};

export default function DeleteBookPopUp({
  bookTitle,
  bookISBN,
}: DeleteBookPropsType) {
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
    dispatch(clearBookNoti());
    setOpen(true);
  };

  const handleDelete = (ISBN: string) => {
    dispatch(deleteBook(ISBN));
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete book" aria-label="delete book" placement="right">
        <IconButton
          style={{
            color: theme.code,
          }}
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete book confirmation"
      >
        <DialogTitle>
          {`Do you really want to delete "${bookTitle}"?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you confirm your action, there is no going back. A good book
            will be gone forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: theme.code }} autoFocus>
            No
          </Button>
          <Button
            onClick={() => handleDelete(bookISBN)}
            style={{ color: theme.code }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
