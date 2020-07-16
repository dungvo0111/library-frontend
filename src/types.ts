// Action types
export const FETCH_BOOKS = 'FETCH_BOOKS'
export const FILTER_BY_QUERY = 'FILTER_BY_QUERY'
export const BOOK_NOT_FOUND = 'BOOK_NOT_FOUND'
export const SEARCH_BY_ISBN = 'SEARCH_BY_ISBN'
export const ADD_BOOK = 'ADD_BOOK'
export const ADD_BOOK_FAILED = 'ADD_BOOK_FAILED'
export const DELETE_BOOK = 'DELETE_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const BORROW_BOOK = 'BORROW_BOOK'
export const BORROW_BOOK_FAILED = 'BORROW_BOOK_FAILED'
export const RETURN_BOOK = 'RETURN_BOOK'
export const CLEAR_BOOK_NOTI = 'CLEAR_BOOK_NOTI'
export const CLEAR_BOOK_BOOLEAN = 'CLEAR_BOOK_BOOLEAN'
export const SET_FILTERS = 'SET_FILTERS'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS'
export const LOADING_BOOKS = 'LOADING_BOOKS'

export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED'
export const SIGN_OUT = 'SIGN_OUT'
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_PASSWORD_FAILED = 'UPDATE_PASSWORD_FAILED'
export const FORGET_PASSWORD = 'FORGET_PASSWORD'
export const FORGET_PASSWORD_FAILED = 'FORGET_PASSWORD_FAILED'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'
export const CLEAR_USER_NOTI = 'CLEAR_USER_NOTI'
export const BORROW_HISTORY = 'BORROW_HISTORY'
export const LOADING_USER = 'LOADING_USER'

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const SORTING_ORDER = 'SORTING_ORDER'

export const ANCHOR_LEFT = 'left'
export const ANCHOR_RIGHT = 'right'
//Books
export type FetchBooksAction = {
    type: typeof FETCH_BOOKS
    payload: {
        results: BookState[],
        pages: number
    }
}

export type FilterByQueryAction = {
    type: typeof FILTER_BY_QUERY
    payload: {
        results: BookState[],
        pages: number
    }
}

export type BookNotFoundAction = {
    type: typeof BOOK_NOT_FOUND
    error: string
}

export type SearchByISBNAction = {
    type: typeof SEARCH_BY_ISBN
    payload: BookState
}

export type AddBookAction = {
    type: typeof ADD_BOOK
    message: string
}

export type AddBookFailedAction = {
    type: typeof ADD_BOOK_FAILED
    error: string
}

export type DeleteBookAction = {
    type: typeof DELETE_BOOK
    message: string
}

export type UpdateBookAction = {
    type: typeof UPDATE_BOOK
    message: string
}

export type BorrowBookAction = {
    type: typeof BORROW_BOOK
    message: string
}

export type BorrowBookFailedAction = {
    type: typeof BORROW_BOOK_FAILED
    error: string
}

export type ReturnBookAction = {
    type: typeof RETURN_BOOK
    message: string
    duration: number
}

export type SetFiltersAction = {
    type: typeof SET_FILTERS
    payload: {
        filters: FilterType
    }
}

export type ClearFilterAction = {
    type: typeof CLEAR_FILTER
    payload: {
        filter: Filter
    }
}

export type ClearAllFiltersAction = {
    type: typeof CLEAR_ALL_FILTERS
}

export type ClearBookNotiAction = {
    type: typeof CLEAR_BOOK_NOTI,
}

export type ClearBookBooleanAction = {
    type: typeof CLEAR_BOOK_BOOLEAN,
}

export type LoadingBooksAction = {
    type: typeof LOADING_BOOKS,
}

//USER
export type SignUpAction = {
    type: typeof SIGN_UP
}

export type SignUpFailedAction = {
    type: typeof SIGN_UP_FAILED
    error: string
}

export type SignInAction = {
    type: typeof SIGN_IN
}

export type SignInFailedAction = {
    type: typeof SIGN_IN_FAILED
    error: string
}

export type SignOutAction = {
    type: typeof SIGN_OUT
}

export type SetAuthenticatedAction = {
    type: typeof SET_AUTHENTICATED
}

export type UpdateProfileAction = {
    type: typeof UPDATE_PROFILE,
    message: string
}

export type UpdateProfileFailedAction = {
    type: typeof UPDATE_PROFILE_FAILED
    error: string
}

export type UpdatePasswordAction = {
    type: typeof UPDATE_PASSWORD,
    message: string
}

export type UpdatePasswordFailedAction = {
    type: typeof UPDATE_PASSWORD_FAILED
    error: string
}

export type ForgetPasswordAction = {
    type: typeof FORGET_PASSWORD,
    message: string
}

export type ForgetPasswordFailedAction = {
    type: typeof FORGET_PASSWORD_FAILED
    error: string
}

export type ResetPasswordAction = {
    type: typeof RESET_PASSWORD,
    message: string
}

export type ResetPasswordFailedAction = {
    type: typeof RESET_PASSWORD_FAILED
    error: string
}

export type ClearUserNotiAction = {
    type: typeof CLEAR_USER_NOTI,
}

export type BorrowHistoryAction = {
    type: typeof BORROW_HISTORY
    payload: BorrowHistoryPayload
}

export type LoadingUserAction = {
    type: typeof LOADING_USER
}

//UI
export type Anchor = 'left' | 'right'
export type Filter = "author" | "title" | "genres" | "status";

export type ToggleDrawerAction = {
    type: typeof TOGGLE_DRAWER
    payload: {
        direction: Anchor
        isOpen: boolean
    }
}

export type SortingOrderAction = {
    type: typeof SORTING_ORDER
}

//Actions
export type BooksActions =
    FetchBooksAction
    | FilterByQueryAction
    | BookNotFoundAction
    | SearchByISBNAction
    | AddBookAction
    | AddBookFailedAction
    | ClearBookNotiAction
    | DeleteBookAction
    | UpdateBookAction
    | BorrowBookAction
    | BorrowBookFailedAction
    | ReturnBookAction
    | SetFiltersAction
    | ClearFilterAction
    | ClearAllFiltersAction
    | ClearBookBooleanAction
    | LoadingBooksAction

export type UserActions =
    SignInAction
    | SignInFailedAction
    | SignOutAction
    | SetAuthenticatedAction
    | SignUpAction
    | SignUpFailedAction
    | UpdateProfileAction
    | UpdateProfileFailedAction
    | UpdatePasswordAction
    | UpdatePasswordFailedAction
    | ForgetPasswordAction
    | ForgetPasswordFailedAction
    | ResetPasswordAction
    | ResetPasswordFailedAction
    | ClearUserNotiAction
    | BorrowHistoryAction
    | LoadingUserAction

export type UiActions =
    | ToggleDrawerAction
    | SortingOrderAction

//State
export type BookState = {
    ISBN: ISBN;
    title: string;
    description: string;
    publisher: string;
    author: string[];
    status: Status;
    genres: string[];
    borrowerId: string[];
    publishedDate: Date;
    borrowedDate: Date;
    returnedDate: Date;
}

export type BooksState = {
    bookList: BookState[],
    pages: number,
    error: string[],
    message: string[],
    filters: FilterType,
    isFiltered: boolean,
    isAdded: boolean,
    isDeleted: boolean,
    isISBN: boolean,
    isUpdated: boolean,
    isBorrowed: boolean,
    isReturned: boolean,
    borrowDuration: number,
    isLoading: boolean,
}

export type UserState = {
    authenticated: boolean,
    signedUp: boolean,
    error: string[],
    message: string[],
    borrowHistory: BorrowHistoryPayload,
    isLoading: boolean,
}

export type UiState = {
    drawers: {
        left: boolean
        right: boolean
    },
    isAscending: boolean

}

export type AppState = {
    books: BooksState,
    user: UserState,
    ui: UiState
}

//others
export type ISBN = '^(97(8|9))?d{9}(d|X)$'
type Status = 'available' | 'borrowed'

export type TokenType = {
    email: string;
    userId: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    exp: number;
    password: string;
};

export type FilterType = {
    author: string;
    title: string;
    status: string;
    genres: string;
};

export type SignInPayload = {
    email: string,
    password: string
}
export type SignUpPayload = {
    firstName: string,
    lastName: string
    email: string,
    password: string
}

export type UpdateProfilePayload = {
    firstName: string,
    lastName: string,
    email: string,
}

export type UpdatePasswordPayload = {
    oldPassword: string,
    newPassword: string,
};

export type ResetPasswordPayload = {
    newPassword: string,
    resetToken: string
};

export type ForgetPasswordPayload = {
    email: string,
    url: string
};

export type UnprocessedBookPayload = {
    ISBN: ISBN;
    author: string;
    title: string;
    genres: string;
    description: string;
    publisher: string;
    publishedDate: string;
}

export type AddBookPayload = {
    ISBN: ISBN;
    title: string;
    description: string;
    publisher: string;
    author: string[];
    genres: string[];
    publishedDate: Date;
}

export type UpdateBookPayload = {
    title: string;
    description: string;
    publisher: string;
    author: string[];
    genres: string[];
    publishedDate: Date;
}

export type UnprocessedUpdateBookPayload = {
    author: string;
    title: string;
    genres: string;
    description: string;
    publisher: string;
    publishedDate: string;
}

export type BorrowBookPayload = {
    returnedDate: Date;
}

export type BorrowHistoryPayload = {
    borrowingBooks: Partial<BookState>[],
    returnedBooks: Partial<BookState>[]
}
