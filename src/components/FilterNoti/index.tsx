import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { AppState, Filter } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import { clearFilter, clearAllFilters } from "../../redux/actions";
//MUI
import Paper from "@material-ui/core/Paper";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

const filterKeys: Filter[] = ["author", "title", "genres", "status"];

export default function FilterNoti() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const filters = useSelector((state: AppState) => state.books.filters);
  const isFiltered = useSelector((state: AppState) => state.books.isFiltered);

  const removeNoti = (filter: Filter) => {
    dispatch(clearFilter(filter));
  };

  const removeAllNoti = () => {
    dispatch(clearAllFilters());
  };

  useEffect(() => {
    if (
      isFiltered &&
      Object.values(filters).every((item) => item?.length === 0)
    ) {
      dispatch(clearAllFilters());
    }
  }, [filters]);

  return (
    <div className="filterNoti">
      {filterKeys.map((item) => {
        const itemValue = filters[item];
        if (itemValue && itemValue.length > 0) {
          return (
            <Paper square className="filterNoti__noti" key={item}>
              <div className="filterNoti__text">
                {item}: <i>{filters[item]}</i>
              </div>
              <IconButton size="small" onClick={() => removeNoti(item)}>
                <ClearIcon />
              </IconButton>
            </Paper>
          );
        }
      })}
      {isFiltered && (
        <Link
          style={{ color: theme.code }}
          className="filterNoti__clearAll"
          onClick={() => removeAllNoti()}
        >
          Clear All
        </Link>
      )}
    </div>
  );
}
