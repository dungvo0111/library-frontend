// Action types
export const FETCH_BOOKS = 'FETCH_BOOKS'
export const FILTER_BY_QUERY = 'FILTER_BY_QUERY'
export const BOOK_NOT_FOUND = 'BOOK_NOT_FOUND'
export const SEARCH_BY_ISBN = 'SEARCH_BY_ISBN'

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
//Books
export type FetchBooksAction = {
    type: typeof FETCH_BOOKS
    payload: BookState[]
}

export type FilterByQueryAction = {
    type: typeof FILTER_BY_QUERY
    payload: BookState[]
}

export type BookNotFoundAction = {
    type: typeof BOOK_NOT_FOUND
    error: string
}

export type SearchByISBNAction = {
    type: typeof SEARCH_BY_ISBN
    payload: BookState
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

//Actions
export type BooksActions =
    FetchBooksAction
    | FilterByQueryAction
    | BookNotFoundAction
    | SearchByISBNAction

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
//State
export type BookState = {
    ISBN: ISBN;
    title: string;
    description: string;
    publisher: string;
    author: [string];
    status: Status;
    genres: [string];
    borrowerId?: string;
    publishedDate: Date;
    borrowedDate?: Date;
    returnedDate?: Date;
}

export type BooksState = {
    bookList: BookState[],
    error: string
}

export type UserState = {
    authenticated: boolean,
    signedUp: boolean,
    error: string[],
    message: string[],
}

export type AppState = {
    books: BooksState,
    user: UserState
}

//others
type ISBN = '^(97(8|9))?d{9}(d|X)$'
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
    author?: string;
    title?: string;
    status?: string;
    genres?: string;
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