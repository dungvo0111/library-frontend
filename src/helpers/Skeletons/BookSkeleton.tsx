import React from "react";

import "./style.scss";
//MUI
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

export default function BookSkeleton() {
  return (
    <div className="skeleton">
      {Array.from({ length: 3 }).map((item, index) => (
        <Paper className="skeleton__container" key={index}>
          <div className="skeleton__content">
            <div className="skeleton__title" />
            <div className="skeleton__author" />
            <Divider />
            <div className="skeleton__genres" />
            <Divider />
            <div className="skeleton__description" />
          </div>
        </Paper>
      ))}
    </div>
  );
}
