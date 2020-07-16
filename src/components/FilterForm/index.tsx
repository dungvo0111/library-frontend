import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { AppState, FilterType } from "../../types";
//Context API
import ThemeContext, { themes } from "../../context";
//redux
import { filterByQuery, showFilters } from "../../redux/actions";
//MUI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
//helpers
import { setQueries } from "../../helpers/helperFunc";
//elemData
import { filterFormElem } from "../../ElemData/elemData";

export default function FilterForm() {
  const { theme } = useContext(ThemeContext);
  const initState = {
    author: "",
    title: "",
    genres: "",
    status: "",
  };
  const [filters, setFilters] = useState<FilterType>(initState);
  const dispatch = useDispatch();
  const currentFilters = useSelector((state: AppState) => state.books.filters);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    let newFilters: FilterType;
    if (Object.values(currentFilters).every((filter) => filter.length < 1)) {
      newFilters = {
        ...filters,
        [target.name]: target.value,
      };
    } else {
      newFilters = {
        ...currentFilters,
        [target.name]: target.value,
      };
    }
    setFilters(newFilters);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queries = setQueries(filters);
    dispatch(showFilters(filters));
    dispatch(filterByQuery(queries));
    setFilters(initState);
  };

  return (
    <Paper className="filter">
      <p className="filter__notice" style={{ color: theme.code }}>
        *Each field can receive multiple values separated by commas
      </p>
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        {filterFormElem.map(
          (elem) => (
            <div className="form__elem" key={elem.label}>
              {elem.name === "status" ? (
                <TextField
                  select
                  id={elem.name}
                  name={elem.name}
                  label={elem.label}
                  value={filters[elem.name]}
                  onChange={handleChange}
                  style={{ color: theme.code }}                  
                >
                  {["available", "borrowed"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  id={elem.name}
                  name={elem.name}
                  label={elem.label}
                  value={filters[elem.name]}
                  onChange={handleChange}
                  style={{ color: theme.code }}
                />
              )}
            </div>
          )
        )}

        <Button
          variant="text"
          style={{
            color: theme.code,
            marginTop: "10px",
          }}
          type="submit"
          size="small"
        >
          Add Filters
        </Button>
      </form>
    </Paper>
  );
}
