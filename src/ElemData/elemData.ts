type UpdateBookElemName =
    | "author"
    | "title"
    | "genres"
    | "publisher"
    | "publishedDate"
    | "description"

type SignUpElemName =
    | "firstName"
    | "lastName"
    | "email"
    | "password"
    | "confirmPassword"

type SignInElemName =
    | "email"
    | "password"

type UpdateProfileElemName =
    | "firstName"
    | "lastName"
    | "email"

type UpdatePasswordElemName =
    | "oldPassword"
    | "newPassword"
    | "confirmPassword"

type ResetPasswordElemName =
    | "newPassword"
    | "confirmPassword"

type FilterElemName = "author" | "title" | "genres" | "status";

type UpdateBookFormElem = Array<{
    label: string;
    name: UpdateBookElemName
}>;

type SignUpFormElem = Array<{
    label: string;
    name: SignUpElemName
}>;

type SignInFormElem = Array<{
    label: string;
    name: SignInElemName
}>;

type UpdateProfileFormElem = Array<{
    label: string;
    name: UpdateProfileElemName
}>;

type UpdatePasswordFormElem = Array<{
    label: string;
    name: UpdatePasswordElemName
}>;

type ResetPasswordFormElem = Array<{
    label: string;
    name: ResetPasswordElemName
}>;

type FilterFormElem = Array<{
    label: string;
    name: FilterElemName;
}>;

export const updateBookFormElem: UpdateBookFormElem = [
    { label: "Author", name: "author" },
    { label: "Title", name: "title" },
    { label: "Genres", name: "genres" },
    { label: "Publisher", name: "publisher" },
    { label: "Published Date", name: "publishedDate" },
    { label: "Description", name: "description" },
];

export const signUpFormElem: SignUpFormElem = [
    { label: "First name", name: "firstName" },
    { label: "Last name", name: "lastName" },
    { label: "Email", name: "email" },
    { label: "Password", name: "password" },
    { label: "Confirm password", name: "confirmPassword" },
];

export const signInFormElem: SignInFormElem = [
    { label: "Email", name: "email" },
    { label: "Password", name: "password" },
];

export const updateProfileFormElem: UpdateProfileFormElem = [
    { label: "First name", name: "firstName" },
    { label: "Last name", name: "lastName" },
    { label: "Email", name: "email" },
];

export const updatePasswordFormElem: UpdatePasswordFormElem = [
    { label: "Old password", name: "oldPassword" },
    { label: "New password", name: "newPassword" },
    { label: "Confirm password", name: "confirmPassword" },
];

export const resetPasswordFormElem: ResetPasswordFormElem = [
    { label: "New password", name: "newPassword" },
    { label: "Confirm password", name: "confirmPassword" },
];

export const filterFormElem: FilterFormElem = [
    { label: "Author", name: "author" },
    { label: "Title", name: "title" },
    { label: "Genres", name: "genres" },
    { label: "Status", name: "status" },
];