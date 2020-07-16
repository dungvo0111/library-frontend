import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import { BookState, AppState } from "../../types";
//components
import FilterNoti from "../FilterNoti";
import UpdateBookPopUp from "../UpdateBookPopUp";
import DeleteBookPopUp from "../DeleteBookPopUp";
import BorrowBookPopUp from "../BorrowBookPopUp";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import { fetchBooks, filterByQuery } from "../../redux/actions";
//MUI
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Pagination from "@material-ui/lab/Pagination";
//helpers
import {
  setQueries,
  getDecodedToken,
  checkBorrow,
} from "../../helpers/helperFunc";
import BookSkeleton from "../../helpers/Skeletons/BookSkeleton";

export default function Book() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const bookList = useSelector((state: AppState) => state.books.bookList);
  const pages = useSelector((state: AppState) => state.books.pages);
  const isFiltered = useSelector((state: AppState) => state.books.isFiltered);
  const isDeleted = useSelector((state: AppState) => state.books.isDeleted);
  const isISBN = useSelector((state: AppState) => state.books.isISBN);
  const isBorrowed = useSelector((state: AppState) => state.books.isBorrowed);
  const isLoading = useSelector((state: AppState) => state.books.isLoading);
  const filters = useSelector((state: AppState) => state.books.filters);
  const authenticated = useSelector(
    (state: AppState) => state.user.authenticated
  );
  const [renderedList, setRenderedList] = useState(bookList);

  useEffect(() => {
    if (!isISBN) {
      if (!isFiltered) {
        dispatch(fetchBooks());
      } else {
        const queries = setQueries(filters);
        dispatch(filterByQuery(queries));
      }
      setPage(1);
    }
  }, [isFiltered, isDeleted, filters, isISBN, isBorrowed]);

  useEffect(() => {
    setRenderedList(bookList);
  }, [bookList]);

  let authors: string = "";
  let genres: string = "";
  //turn authors and genres to comma-separated string
  const handleList = (list: string[], result: string) => {
    list.map((item) => {
      result += item;
      result += ", ";
    });
    return result.slice(0, -2);
  };

  const [page, setPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    let queries;
    if (isFiltered) {
      queries = setQueries(filters);
      dispatch(filterByQuery(queries, `&page=${value}&limit=3`));
    } else {
      queries = `?page=${value}&limit=3`;
      dispatch(fetchBooks(queries));
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (localStorage.signInToken && authenticated) {
      let decodedToken = getDecodedToken();
      setIsAdmin(decodedToken.isAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [authenticated]);

  return (
    <div className="books">
      <FilterNoti />
      {isLoading && <BookSkeleton />}
      {!isLoading && renderedList.length === 0 && (
        <Paper className="books__book notFound">No books found</Paper>
      )}

      {!isLoading &&
        renderedList.map((book: BookState) => (
          <Paper className="books__book" key={book.ISBN}>
            <div className="books__bookContainer">
              <h1>{book.title}</h1>
              {/* <div className="books__bookElem">
              <p>ISBN:</p>
              <div>{book.ISBN}</div>
            </div> */}
              <div className="books__bookContent">
                <div className="books__subTitle">
                  <ul className="books__bookElem">
                    &nbsp;by&nbsp;
                    <span className="books__author">
                      {handleList(book.author, authors)}
                    </span>
                  </ul>
                </div>
                <Divider />
                <div className="books__genres">
                  <ul className="books__bookElem">
                    <p>genres:</p>
                    {handleList(book.genres, genres)}
                  </ul>
                </div>
                <Divider />
                {/* <div className="books__bookElem">
                  <p>Publisher:</p>
                  <div>{book.publisher}</div>
                </div>
                <div className="books__bookElem">
                  <p>Published date:</p>
                  <div>{dayjs(book.publishedDate).format("MMMM DD YYYY")}</div>
                </div> */}
                <div className="books__description">
                  <p>Description:</p>
                  <div>{book.description}</div>
                </div>
                {/* <div className="books__bookElem">
                <p>Status:</p>
                <div>{book.status}</div>
              </div> */}
              </div>
            </div>
            {/* <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              color: theme.code,
            }}
            size="small"
          >
            Borrow
          </Button> */}
            {authenticated && (
              <>
                <div>
                  <BorrowBookPopUp
                    bookISBN={book.ISBN}
                    bookTitle={book.title}
                  />
                  {isAdmin && (
                    <DeleteBookPopUp
                      bookTitle={book.title}
                      bookISBN={book.ISBN}
                    />
                  )}
                </div>
              </>
            )}

            {isAdmin && <UpdateBookPopUp book={book} />}

            {authenticated &&
              (!checkBorrow(book.borrowerId) ? (
                <div
                  className="tag"
                  style={{
                    backgroundColor: theme.code,
                    color: "white",
                  }}
                >
                  AVAILABLE
                </div>
              ) : (
                <div
                  className="tag"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                  }}
                >
                  BORROWING
                </div>
              ))}

            {/* //(
          //   <>
          //     <Button variant="contained" size="small" disabled>
          //       Borrow
          //     </Button>
          //     <div
          //       className="tag"
          //       style={{
          //         backgroundColor: "grey",
          //         color: "white",
          //       }}
          //     >
          //       BORROWED
          //     </div>
          //   </>
          // )} */}
          </Paper>
        ))}
      <Pagination count={pages} page={page} onChange={handleChange} />
    </div>
  );
}
