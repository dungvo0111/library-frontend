import {
    BooksState,
    FETCH_BOOKS,
    FILTER_BY_QUERY,
    BOOK_NOT_FOUND,
    SEARCH_BY_ISBN,
    BooksActions,   
} from '../../types'

const defaultState: BooksState = {
    bookList: [],
    error: ""
}

export default function books(
    state: BooksState = defaultState,
    action: BooksActions
): BooksState {
    switch (action.type) {
        case FETCH_BOOKS:
            return {
                ...state,
                bookList: [...action.payload]
            }
        case FILTER_BY_QUERY:
            return {
                ...state,
                bookList: [...action.payload]
            }
            case SEARCH_BY_ISBN:
                return {
                    ...state,
                    bookList: [action.payload]
                }
        case BOOK_NOT_FOUND:
            console.log(action.error)
                return {
                    ...state,
                    bookList: [],
                    error: action.error
                }
        default:
            return state
    }
}