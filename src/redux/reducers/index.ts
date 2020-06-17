import { combineReducers } from 'redux'

import books from './books'
import user from './user'

const createRootReducer = () =>
  combineReducers({
    books,
    user
  })

export default createRootReducer
