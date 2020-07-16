import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import {
  UnprocessedBookPayload,
  AddBookPayload,
  ISBN,
  AppState,
} from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import { addBook, fetchBooks } from "../../redux/actions";
//MUI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
//helpers
import { processBookPayload } from "../../helpers/helperFunc";
import TextField from "@material-ui/core/TextField";

type elemName =
  | "ISBN"
  | "author"
  | "title"
  | "genres"
  | "publisher"
  | "publishedDate"
  | "description";
type formElem = Array<{
  label: string;
  name: elemName;
}>;
const formElem: formElem = [
  { label: "ISBN", name: "ISBN" },
  { label: "Author", name: "author" },
  { label: "Title", name: "title" },
  { label: "Genres", name: "genres" },
  { label: "Publisher", name: "publisher" },
  { label: "Published Date", name: "publishedDate" },
  { label: "Description", name: "description" },
];

export default function AddBookForm() {
  const { theme } = useContext(ThemeContext);
  const message = useSelector((state: AppState) => state.books.message);
  const isAdded = useSelector((state: AppState) => state.books.isAdded);

  useEffect(() => {
    if (isAdded) {
      dispatch(fetchBooks());
    }
  }, [isAdded]);

  useEffect(() => {
    if (message.length > 0) {
      setBookPayload(initState);
    }
  }, [message]);

  const initState = {
    ISBN: "" as ISBN,
    author: "",
    title: "",
    genres: "",
    description: "",
    publisher: "",
    publishedDate: "",
  };
  const [bookPayload, setBookPayload] = useState(initState);
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.currentTarget;
    const newBookPayload = {
      ...bookPayload,
      [target.name]: target.value,
    };
    setBookPayload(newBookPayload);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const processedPayload: AddBookPayload = processBookPayload(bookPayload);
    dispatch(addBook(processedPayload));
  };

  return (
    <Paper className="addBookContainer">
      <p className="notice" style={{ color: theme.code }}>
        *Author and genres fields can receive multiple values separated by
        commas
      </p>
      <form className="addForm" onSubmit={handleSubmit}>
        {formElem.map((elem) => (
          <div className="addForm__elem" key={elem.label}>
            <TextField
              id={elem.label}
              name={elem.name}
              label={elem.label}
              multiline={elem.name === "description" && true}
              value={bookPayload[elem.name]}
              onChange={handleChange}
              style={{ color: theme.code }}
              required
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
          Add Book
        </Button>
      </form>
    </Paper>
  );
}
