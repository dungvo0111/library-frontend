import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import { AppState } from "../../types";
//components
import Book from "../../components/Book";
import FilterForm from "../../components/FilterForm";
import Nav from "../../components/Nav";

export default function Home() {
  const bookList = useSelector((state: AppState) => state.books.bookList);
  const bookError = useSelector((state: AppState) => state.books.error);
  const [renderedList, setRenderedList] = useState(bookList);
  useEffect(() => {
    setRenderedList(bookList);
  }, [bookList]);

  return (
    <div className="home">
      <Nav />
      <FilterForm />
      {renderedList.length === 0 && <h3>{bookError}</h3>}
      <div className="home__bookList">
        {renderedList.map((book) => (
          <Book
            key={book.ISBN}
            title={book.title}
            ISBN={book.ISBN}
            author={book.author}
            description={book.description}
            publisher={book.publisher}
            publishedDate={book.publishedDate}
            status={book.status}
            genres={book.genres}
          />
        ))}
      </div>
    </div>
  );
}
