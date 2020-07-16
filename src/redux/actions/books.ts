import { Dispatch } from 'redux'
import axios from "axios";
import {
  FETCH_BOOKS,
  FILTER_BY_QUERY,
  BOOK_NOT_FOUND,
  SEARCH_BY_ISBN,
  AddBookPayload,
  ADD_BOOK,
  ADD_BOOK_FAILED,
  BooksActions,
  CLEAR_BOOK_NOTI,
  DELETE_BOOK,
  FilterType,
  Filter,
  SET_FILTERS,
  CLEAR_FILTER,
  CLEAR_ALL_FILTERS,
  CLEAR_BOOK_BOOLEAN,
  UpdateBookPayload,
  UPDATE_BOOK,
  BORROW_BOOK,
  BORROW_BOOK_FAILED,
  BorrowBookPayload,
  RETURN_BOOK,
  LOADING_BOOKS
} from '../../types'

import { setAuthorizationHeader } from '../../helpers/helperFunc';

export function fetchBooks(queries: string = "?page=1&limit=3") {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING_BOOKS })
      axios.get("/books" + queries).then(res => {
        dispatch({
          type: FETCH_BOOKS,
          payload: res.data
        })
      })

    } catch (error) {
      console.log(error)
    }
  }
}

export function filterByQuery(queries: string, pageLimit: string = "&page=1&limit=3") {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOADING_BOOKS })
      axios.get("/books/Filtering" + queries + pageLimit).then(res => {
        dispatch({
          type: FILTER_BY_QUERY,
          payload: res.data
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function searchByISBN(ISBN: string) {
  return async (dispatch: Dispatch) => {
    try {
      axios.get(`/books/${ISBN}`).then(res => {

        dispatch({
          type: SEARCH_BY_ISBN,
          payload: res.data
        })
      }).catch(err => {
        console.log(err.response.data.message)
        dispatch({
          type: BOOK_NOT_FOUND,
          error: err.response.data.message
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function addBook(addBookPayload: AddBookPayload) {
  return async (dispatch: Dispatch) => {
    try {
      setAuthorizationHeader(localStorage.signInToken);
      axios.post("/books", addBookPayload).then(res => {
        dispatch({
          type: ADD_BOOK,
          message: res.data.message
        })
      })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data.message)
            dispatch({
              type: ADD_BOOK_FAILED,
              error: err.response.data.message
            })
          }
        })

    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteBook(ISBN: string) {
  return async (dispatch: Dispatch) => {
    try {
      setAuthorizationHeader(localStorage.signInToken);
      axios.delete(`/books/${ISBN}`).then(res => {
        dispatch({
          type: DELETE_BOOK,
          message: res.data.message
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateBook(ISBN: string, updateBookPayload: UpdateBookPayload) {
  return async (dispatch: Dispatch) => {
    try {
      setAuthorizationHeader(localStorage.signInToken);
      axios.put(`/books/${ISBN}`, updateBookPayload).then(res => {
        dispatch({
          type: UPDATE_BOOK,
          message: "Book updated successfully!"
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function borrowBook(ISBN: string, returnedDate: BorrowBookPayload) {
  return async (dispatch: Dispatch) => {
    try {
      setAuthorizationHeader(localStorage.signInToken);
      axios.put(`/books/${ISBN}/borrowBook`, returnedDate).then(res => {
        dispatch({
          type: BORROW_BOOK,
          message: "Book borrowed successfully!"
        })
      }).catch(err => {
        console.log(err)
        dispatch({
          type: BORROW_BOOK_FAILED,
          error: err.response.data.message
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function returnBook(ISBN: string, returnedDate: BorrowBookPayload, duration: number) {
  return async (dispatch: Dispatch) => {
    try {
      setAuthorizationHeader(localStorage.signInToken);
      axios.put(`/books/${ISBN}/returnBook`, returnedDate).then(res => {
        dispatch({
          type: RETURN_BOOK,
          message: "Book returned successfully!",
          duration: duration
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function clearBookNoti(): BooksActions {
  return {
    type: CLEAR_BOOK_NOTI,
  }
}

export function clearBookBoolean(): BooksActions {
  return {
    type: CLEAR_BOOK_BOOLEAN,
  }
}

export function showFilters(filters: FilterType): BooksActions {
  return {
    type: SET_FILTERS,
    payload: {
      filters: filters
    },
  }
}

export function clearFilter(filter: Filter): BooksActions {
  return {
    type: CLEAR_FILTER,
    payload: {
      filter: filter
    },
  }
}

export function clearAllFilters(): BooksActions {
  return {
    type: CLEAR_ALL_FILTERS
  }
}