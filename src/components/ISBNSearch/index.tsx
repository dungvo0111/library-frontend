import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./style.scss";
//redux
import { searchByISBN } from "../../redux/actions/books";

export default function ISBNSearch() {
  const dispatch = useDispatch();
  const [ISBN, setISBN] = useState("");
  
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setISBN(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchByISBN(ISBN));
    setISBN("");
  };
  return (
    <form className="formISBN" onSubmit={handleSubmit}>
      <input
        placeholder="Search by ISBN"
        type="text"
        name="genres"
        value={ISBN}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}
