import { combineReducers } from 'redux'

import books from './books'
import user from './user'
import ui from './ui'

const createRootReducer = () =>
  combineReducers({
    books,
    user,
    ui
  })

export default createRootReducer
