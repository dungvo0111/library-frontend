import {
    TOGGLE_DRAWER,
    UiState,
    UiActions,
    SORTING_ORDER,

} from '../../types'

const defaultState: UiState = {
    drawers: {
        left: false,
        right: false,
    },
    isAscending: true, //ascending order as default
}

export default function ui(
    state: UiState = defaultState,
    action: UiActions
): UiState {
    switch (action.type) {
        case TOGGLE_DRAWER: {
            const { direction, isOpen } = action.payload
            return {
                ...state,
                drawers: {
                    ...state.drawers,
                    [direction]: isOpen,
                },
            }
        }
        case SORTING_ORDER:
            return {
                ...state,
                isAscending: !state.isAscending,
            }

        default:
            return state
    }
}