import {
    BooksState,
    FETCH_BOOKS,
    FILTER_BY_QUERY,
    BOOK_NOT_FOUND,
    SEARCH_BY_ISBN,
    BooksActions,
    ADD_BOOK,
    ADD_BOOK_FAILED,
    CLEAR_BOOK_NOTI,
    DELETE_BOOK,
    SET_FILTERS,
    CLEAR_FILTER,
    CLEAR_ALL_FILTERS,
    CLEAR_BOOK_BOOLEAN,
    UPDATE_BOOK,
    BORROW_BOOK,
    BORROW_BOOK_FAILED,
    RETURN_BOOK,
    LOADING_BOOKS,
} from '../../types'

const defaultState: BooksState = {
    bookList: [],
    pages: 0,
    error: [],
    message: [],
    filters: {
        author: "",
        title: "",
        genres: "",
        status: "",
    },
    isFiltered: false,
    isAdded: false,
    isDeleted: false,
    isISBN: false,
    isUpdated: false,
    isBorrowed: false,
    isReturned: false,
    borrowDuration: 0,
    isLoading: false,
}

export default function books(
    state: BooksState = defaultState,
    action: BooksActions
): BooksState {
    switch (action.type) {
        case FETCH_BOOKS:
            return {
                ...state,
                isAdded: false,
                isDeleted: false,
                isISBN: false,
                isUpdated: false,
                isBorrowed: false,
                isReturned: false,
                isLoading: false,
                borrowDuration: 0,
                bookList: [...action.payload.results],
                error: [],
                message: [],
                pages: action.payload.pages
            }
        case FILTER_BY_QUERY:
            return {
                ...state,
                isLoading: false,
                bookList: [...action.payload.results],
                pages: action.payload.pages
            }
        case SEARCH_BY_ISBN:
            return {
                ...state,
                bookList: [action.payload],
                isISBN: true,
                filters: {
                    author: "",
                    title: "",
                    genres: "",
                    status: "",
                },
                pages: 0,
                isFiltered: false,
            }
        case BOOK_NOT_FOUND:
            return {
                ...state,
                bookList: [],
                isISBN: true,
                filters: {
                    author: "",
                    title: "",
                    genres: "",
                    status: "",
                },
                pages: 0,
                isFiltered: false,
                error: [...state.error, action.error]
            }
        case ADD_BOOK:
            return {
                ...state,
                error: [],
                isAdded: true,
                message: [...state.message, action.message]
            }
        case ADD_BOOK_FAILED:
            return {
                ...state,
                isAdded: false,
                error: [...state.error, action.error]
            }
        case CLEAR_BOOK_NOTI:
            return {
                ...state,
                error: [],
                message: [],
                borrowDuration: 0,
            }
        case CLEAR_BOOK_BOOLEAN:
            return {
                ...state,
                isAdded: false,
                isDeleted: false,
                isISBN: false,
                isUpdated: false,
                isBorrowed: false,
                isReturned: false,
            }
        case DELETE_BOOK:
            return {
                ...state,
                isDeleted: true,
                message: [...state.message, action.message]
            }
        case UPDATE_BOOK:
            return {
                ...state,
                isUpdated: true,
                message: [...state.message, action.message]
            }
        case BORROW_BOOK:
            return {
                ...state,
                isBorrowed: true,
                message: [...state.message, action.message]
            }
        case RETURN_BOOK:
            return {
                ...state,
                isReturned: true,
                borrowDuration: action.duration,
                message: [...state.message, action.message]
            }
        case BORROW_BOOK_FAILED:
            return {
                ...state,
                error: [...state.error, action.error]
            }
        case SET_FILTERS: {
            const { filters } = action.payload
            return {
                ...state,
                filters: filters,
                isFiltered: true
            }
        }
        case CLEAR_FILTER: {
            const { filter } = action.payload
            const newFilters = { ...state.filters };
            newFilters[filter] = ""
            return {
                ...state,
                filters: newFilters
            }
        }
        case CLEAR_ALL_FILTERS: {
            return {
                ...state,
                filters: {
                    author: "",
                    title: "",
                    genres: "",
                    status: "",
                },
                isFiltered: false
            }
        }
        case LOADING_BOOKS: {
            return {
                ...state,
                isLoading: true
            }
        }

        default:
            return state
    }
}