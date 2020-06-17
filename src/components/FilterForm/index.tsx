import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./style.scss";
import { FilterType } from "../../types";
//redux
import { filterByQuery } from "../../redux/actions";

export default function FilterForm() {
  const initState = {
    author: "",
    title: "",
    status: "",
    genres: "",
  };
  const [filters, setFilters] = useState<FilterType>(initState);
  const dispatch = useDispatch();
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newFilters: FilterType = { ...filters, [target.name]: target.value };
    setFilters(newFilters);
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget;
    const newFilters: FilterType = { ...filters, [target.name]: target.value };
    setFilters(newFilters);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queries = setQueries(
      filters.author,
      filters.title,
      filters.status,
      filters.genres
    );

    dispatch(filterByQuery(queries));
    setFilters(initState);
  };

  const setQueries = (
    author: string | undefined,
    title: string | undefined,
    status: string | undefined,
    genres: string | undefined
  ) => {
    if (
      author?.includes(",") ||
      title?.includes(",") ||
      status?.includes(",") ||
      genres?.includes(",")
    ) {
      const authorArr = author?.split(", ");
      const titleArr = title?.split(", ");
      const statusArr = status?.split(", ");
      const genresArr = genres?.split(", ");
      let authorQuery = "";
      let titleQuery = "";
      let statusQuery = "";
      let genresQuery = "";
      if (authorArr && authorArr.length > 0) {
        authorArr.map((item) => (authorQuery += `author=${item}&`));
      }
      if (titleArr && titleArr.length > 0) {
        titleArr.map((item) => (titleQuery += `title=${item}&`));
      }
      if (statusArr && statusArr.length > 0) {
        statusArr.map((item) => (statusQuery += `status=${item}&`));
      }
      if (genresArr && genresArr.length > 0) {
        genresArr.map((item) => (genresQuery += `genres=${item}&`));
      }

      return "?" + authorQuery + titleQuery + statusQuery + genresQuery;
    }

    return (
      "?author=" +
      author +
      "&title=" +
      title +
      "&status=" +
      status +
      "&genres=" +
      genres
    );
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__elem">
        <label htmlFor="author">Author: </label>
        <input
          id="author"
          type="text"
          name="author"
          value={filters.author}
          onChange={handleChange}
        />
      </div>
      <div className="form__elem">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
        />
      </div>
      <div className="form__elem">
        <label htmlFor="genres">Genres: </label>
        <input
          id="genres"
          type="text"
          name="genres"
          value={filters.genres}
          onChange={handleChange}
        />
      </div>
      <div className="form__elem">
        <label htmlFor="status">Status: </label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleStatus}
        >
          <option value=""></option>
          <option value="available">available</option>
          <option value="borrowed">borrowed</option>
        </select>
      </div>

      <button type="submit">Set Filters</button>
    </form>
  );
}
