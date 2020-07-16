import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import { AppState, BookState, UpdateBookPayload } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//components
import AddBookForm from "../AddBookForm";
//MUI
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
//redux
import { clearBookNoti, updateBook, fetchBooks } from "../../redux/actions";
//helpers
import { processUpdateBookPayload } from "../../helpers/helperFunc";
//elemData
import { updateBookFormElem } from "../../ElemData/elemData";

type UpdateBookPropsType = {
  book: BookState;
};

export default function UpdateBookPopUp({ book }: UpdateBookPropsType) {
  const {
    ISBN,
    author,
    title,
    genres,
    publisher,
    publishedDate,
    description,
  } = book;
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );
  const isUpdated = useSelector((state: AppState) => state.books.isUpdated);
  const { theme } = useContext(ThemeContext);
  //Popup open state
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(false);
  }, [authenticated]);

  //popup close
  const handleClose = () => {
    dispatch(fetchBooks());
    setOpen(false);
  };

  //popup open
  const handleClickOpen = () => {
    dispatch(clearBookNoti());
    setOpen(true);
  };

  const initState = {
    author: author.toString(),
    title: title,
    genres: genres.toString(),
    description: description,
    publisher: publisher,
    publishedDate: new Date(publishedDate).toDateString(),
  };
  const [updateBookPayload, setUpdateBookPayload] = useState(initState);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.currentTarget;
    const newBookPayload = {
      ...updateBookPayload,
      [target.name]: target.value,
    };
    setUpdateBookPayload(newBookPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const processedPayload: UpdateBookPayload = processUpdateBookPayload(
      updateBookPayload
    );
    dispatch(updateBook(ISBN, processedPayload));
  };

  return (
    <>
      <Tooltip title="Update book" aria-label="update book" placement="left">
        <IconButton
          style={{
            color: theme.code,
          }}
          className="editIcon"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
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
          <Paper className="addBookContainer">
            <p className="notice" style={{ color: theme.code }}>
              *Author and genres fields can receive multiple values separated by
              commas. Change the fields you wish to update.
            </p>
            <form className="addForm" onSubmit={handleSubmit}>
              {updateBookFormElem.map((elem) => (
                <div className="addForm__elem" key={elem.name}>
                  <TextField
                    id={elem.name}
                    name={elem.name}
                    label={elem.label}
                    multiline={elem.name === "description" && true}
                    value={updateBookPayload[elem.name]}
                    onChange={handleChange}
                    style={{ color: theme.code }}
                  />
                </div>
              ))}
              <Button
                variant="text"
                style={{
                  color: theme.code,
                  marginTop: "10px",
                }}
                type="submit"
                size="small"
              >
                Update Book
              </Button>
            </form>
          </Paper>
        </div>
      </Dialog>
    </>
  );
}
