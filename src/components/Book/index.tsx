import React from "react";
import dayjs from "dayjs";

import "./style.scss";
import { BookState } from "../../types";

export default function Book({
  title,
  ISBN,
  description,
  publisher,
  publishedDate,
  author,
  status,
  genres,
}: BookState) {
  return (
    <div className="bookContainer">
      <h2>Tittle: {title}</h2>
      <p>ISBN: {ISBN}</p>
      <ul>
        Authors:{" "}
        {author.map((item) => (
          <li key={item} style={{ listStyle: "none" }}>
            {item}
          </li>
        ))}
      </ul>
      <ul>
        Genres:{" "}
        {genres.map((item) => (
          <li key={item} style={{ listStyle: "none" }}>
            {item}
          </li>
        ))}
      </ul>
      <p>Publisher: {publisher}</p>
      <p>Published date: {dayjs(publishedDate).format("MMMM DD YYYY")}</p>
      <p>Description: {description}</p>
      <p>Status: {status}</p>
    </div>
  );
}
