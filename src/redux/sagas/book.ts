import { takeLatest } from 'redux-saga/effects'

import { FETCH_BOOKS } from '../../types'

function* checkStore() {
  yield console.log("fetched")
}

export default [takeLatest(FETCH_BOOKS, checkStore)]