import {
  TOGGLE_DRAWER,
  UiActions,
  Anchor,
  SORTING_ORDER,

} from '../../types'

export function toggleDrawer(anchor: Anchor, open: boolean): UiActions {
  return {
    type: TOGGLE_DRAWER,
    payload: {
      direction: anchor,
      isOpen: open,
    },
  }
}

export function changeSortingOrder(): UiActions {
  return {
    type: SORTING_ORDER,
  }
}