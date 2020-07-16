import jwtDecode from "jwt-decode";
import axios from "axios";

import { FilterType, TokenType, UnprocessedBookPayload, UnprocessedUpdateBookPayload, BookState } from "../types";

export const setAuthorizationHeader = (token: string) => {
    if (!localStorage.getItem("signInToken") || token !== localStorage.getItem("signInToken")) {
        const signInToken = `Bearer ${token}`;
        localStorage.setItem("signInToken", signInToken);
        axios.defaults.headers.common["Authorization"] = signInToken;
    } else {
        axios.defaults.headers.common["Authorization"] = token;
    }
};

export const deleteToken = () => {
    localStorage.removeItem("signInToken")
}

export const setQueries = (
    filters: FilterType
) => {
    const { author, title, status, genres } = filters
    const Arr = [
        { author: author },
        { title: title },
        { status: status },
        { genres: genres },
    ];
    let queryString = "?";
    Arr.map((queryObj) => {
        if (Object.values(queryObj).length === 1) {
            const stringValues = Object.values(queryObj)[0] as string;

            stringValues
                .split(", ")
                .map(
                    (string) =>
                        (queryString += `${Object.keys(queryObj)[0]}=${string}&`)
                );
        }
    });
    return queryString;
};

export const getDecodedToken = () => {
    return jwtDecode<TokenType>(localStorage.signInToken);
}

export const processBookPayload = (bookPayload: UnprocessedBookPayload) => {
    const { ISBN, title, author, genres, publishedDate, publisher, description } = bookPayload
    const authorArr = author.replace(/\s+/g, '').split(",")
    const genresArr = genres.replace(/\s+/g, '').split(",")
    const newPublishedDate = new Date(publishedDate)

    return {
        ISBN,
        title,
        author: authorArr,
        genres: genresArr,
        publisher,
        publishedDate: newPublishedDate,
        description
    }
}

export const processUpdateBookPayload = (updateBookPayload: UnprocessedUpdateBookPayload) => {
    const { title, author, genres, publishedDate, publisher, description } = updateBookPayload
    const authorArr = author.replace(/\s+/g, '').split(",")
    const genresArr = genres.replace(/\s+/g, '').split(",")
    const newPublishedDate = new Date(publishedDate)

    return {
        title,
        author: authorArr,
        genres: genresArr,
        publisher,
        publishedDate: newPublishedDate,
        description
    }
}

export const checkBorrow = (borrowerId: string[]): boolean => {
    const userId = getDecodedToken().userId
    return borrowerId.some(id => id === userId)
}

// export const getReturnBookList = (list: Partial<BookState>[]): Partial<BookState>[] => {

//     let result: Partial<BookState>[] = [...list]


//     list.reduce((a, b) =>
//         (((a.returnedDate as Date) > (b.returnedDate as Date)) ? a : b
//         ))

//     const x = list.reduce((a, b) => (((a.ISBN as string) === (b.ISBN as string)) ? (((a.returnedDate as Date) > (b.returnedDate as Date)) ? a : b) : b))

//     return result;
// }