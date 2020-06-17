import {
    UserState,
    SIGN_IN,
    SIGN_IN_FAILED,
    SIGN_UP,
    SIGN_UP_FAILED,
    SIGN_OUT,
    UserActions,
    SET_AUTHENTICATED,
    UPDATE_PROFILE,
    UPDATE_PROFILE_FAILED,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_FAILED,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD,
} from '../../types'

const defaultState: UserState = {
    authenticated: false,
    signedUp: false,
    error: [],
    message: []
}

export default function user(
    state: UserState = defaultState,
    action: UserActions
): UserState {
    switch (action.type) {
        case SIGN_IN:
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
                signedUp: false,
                error: [],
            }
        case SIGN_IN_FAILED:
            return {
                ...state,
                authenticated: false,
                message: [],
                error: [...state.error, action.error]
            }
        case SIGN_OUT:
            return {
                ...state,
                authenticated: false,
                error: [],
            }
        case SIGN_UP:
            return {
                ...state,
                signedUp: true,
                error: []
            }
        case SIGN_UP_FAILED:
        case UPDATE_PROFILE_FAILED:
        case UPDATE_PASSWORD_FAILED:
        case FORGET_PASSWORD_FAILED:
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                message: [],
                error: [...state.error, action.error]
            }
        case UPDATE_PROFILE:
        case UPDATE_PASSWORD:
        case FORGET_PASSWORD:
        case RESET_PASSWORD:
            return {
                ...state,
                error: [],
                message: [...state.message, action.message]
            }
        default:
            return state
    }
}