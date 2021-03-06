import { Dispatch } from 'redux'
import axios from "axios";
import {
    SIGN_IN,
    SIGN_IN_FAILED,
    SIGN_OUT,
    SIGN_UP,
    SIGN_UP_FAILED,
    SET_AUTHENTICATED,
    UPDATE_PROFILE,
    UPDATE_PROFILE_FAILED,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_FAILED,
    UserActions,
    SignInPayload,
    SignUpPayload,
    UpdateProfilePayload,
    UpdatePasswordPayload,
    ForgetPasswordPayload,
    ResetPasswordPayload,
    CLEAR_USER_NOTI,
    BORROW_HISTORY,
    LOADING_USER,
} from '../../types'
//helpers
import { setAuthorizationHeader, deleteToken } from '../../helpers/helperFunc';

export function signUp(signUpPayload: SignUpPayload) {
    return async (dispatch: Dispatch) => {
        try {
            axios.post("/user", signUpPayload).then(res => {
                dispatch({
                    type: SIGN_UP,
                })
            })
                .catch(err => {
                    if (err.response) {
                        console.log(err.response.data.message)
                        dispatch({
                            type: SIGN_UP_FAILED,
                            error: err.response.data.message
                        })
                    }
                })

        } catch (error) {
            console.log(error)
        }
    }
}

export function signIn(signInPayload: SignInPayload) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADING_USER })
            axios.post("/user/signIn", signInPayload).then(res => {
                setAuthorizationHeader(res.data.token);
                dispatch({
                    type: SIGN_IN
                })
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.data.message)
                    dispatch({
                        type: SIGN_IN_FAILED,
                        error: err.response.data.message
                    })
                }

            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function googleSignIn(idToken: string) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOADING_USER })
            setAuthorizationHeader(idToken);
            axios.post("/user/googleSignIn").then(res => {
                setAuthorizationHeader(res.data.token);
                dispatch({
                    type: SIGN_IN
                })
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.data.message)
                    dispatch({
                        type: SIGN_IN_FAILED,
                        error: err.response.data.message
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function signOut(): UserActions {
    deleteToken();
    return {
        type: SIGN_OUT
    }
}

export function setAuthenticated(): UserActions {
    return {
        type: SET_AUTHENTICATED
    }
}

export function updateProfile(payload: UpdateProfilePayload) {
    return async (dispatch: Dispatch) => {
        try {
            setAuthorizationHeader(localStorage.signInToken);
            axios.put("/user/updateProfile", payload).then(res => {
                console.log(res.data)
                setAuthorizationHeader(res.data.token);
                dispatch({
                    type: UPDATE_PROFILE,
                    message: res.data.message
                })
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.data.message)
                    dispatch({
                        type: UPDATE_PROFILE_FAILED,
                        error: err.response.data.message
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function updatePassword(payload: UpdatePasswordPayload) {
    return async (dispatch: Dispatch) => {
        try {
            setAuthorizationHeader(localStorage.signInToken)
            axios.put("/user/updatePassword", payload).then(res => {
                setAuthorizationHeader(res.data.token)
                dispatch({
                    type: UPDATE_PASSWORD,
                    message: res.data.message
                })
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.data.message)
                    dispatch({
                        type: UPDATE_PASSWORD_FAILED,
                        error: err.response.data.message
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function forgetPassword(payload: ForgetPasswordPayload) {
    return async (dispatch: Dispatch) => {
        try {
            axios.post("/user/resetPassword", payload).then(res => {
                dispatch({
                    type: FORGET_PASSWORD,
                    message: res.data.message
                })
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.data.message)
                    dispatch({
                        type: FORGET_PASSWORD_FAILED,
                        error: err.response.data.message
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function resetPassword(payload: ResetPasswordPayload) {
    return async (dispatch: Dispatch) => {
        try {
            axios.put(`/user/resetPassword/${payload.resetToken}`, payload).then(res => {
                dispatch({
                    type: RESET_PASSWORD,
                    message: res.data.message
                })
            }).catch(err => {
                if (err.response) {
                    console.log(err)
                    dispatch({
                        type: RESET_PASSWORD_FAILED,
                        error: err.response.data.message
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function clearUserNoti(): UserActions {
    return {
        type: CLEAR_USER_NOTI,
    }
}

export function getBorrowHistory(userId: string) {
    return async (dispatch: Dispatch) => {
        try {
            axios.get(`/user/${userId}`).then(res => {
                dispatch({
                    type: BORROW_HISTORY,
                    payload: res.data
                })
            })

        } catch (error) {
            console.log(error)
        }
    }
}
