import { Dispatch } from 'redux'
import axios from "axios";
import {
  FETCH_BOOKS,
  FILTER_BY_QUERY,
  BOOK_NOT_FOUND,
  SEARCH_BY_ISBN,
} from '../../types'

export function fetchBooks() {
  return async (dispatch: Dispatch) => {
    try {

      axios.get("/books").then(res => {
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

export function filterByQuery(queries: string) {
  return async (dispatch: Dispatch) => {
    try {
      axios.get("/books/Filtering" + queries).then(res => {

        dispatch({
          type: FILTER_BY_QUERY,
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