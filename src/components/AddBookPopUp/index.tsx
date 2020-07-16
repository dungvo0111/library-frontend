import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { AppState } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//components
import AddBookForm from "../AddBookForm";
//MUI
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
//redux
import { clearBookNoti } from "../../redux/actions";

export default function AddBookPopUp() {
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

  return (
    <>
      <Tooltip title="Add book" aria-label="add book" placement="top-end">
        <Fab
          color="primary"
          style={{ backgroundColor: theme.code }}
          aria-label="add"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="add book dialog"
      >
        <div className="dialog">
          <div className="dialog__closeIcon">
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <AddBookForm />
        </div>
      </Dialog>
    </>
  );
}
