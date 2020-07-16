import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../../types";
import "./style.scss";
//MUI
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
//redux
import { changeSortingOrder } from "../../redux/actions";

type BorrowBookHeaderPropsType = {
  forBorrow: boolean;
};

export default function BorrowBookHeader({
  forBorrow,
}: BorrowBookHeaderPropsType) {
  const dispatch = useDispatch();
  const isAscending = useSelector((state: AppState) => state.ui.isAscending);

  const handleClick = () => {
    dispatch(changeSortingOrder());
  };

  return (
    <div className="labels">
      <p className="labels__ISBN">ISBN</p>
      <div className="labels__title">
        <span style={{ marginRight: "5px" }}>Title</span>
        {isAscending ? (
          <ArrowDownwardIcon
            fontSize="inherit"
            className="labels__sortIcon"
            onClick={handleClick}
          />
        ) : (
          <ArrowUpwardIcon
            fontSize="inherit"
            className="labels__sortIcon"
            onClick={handleClick}
          />
        )}
      </div>
      <p className="labels__date">
        {forBorrow ? "Borrowed Date" : "Returned Date"}
      </p>
    </div>
  );
}
