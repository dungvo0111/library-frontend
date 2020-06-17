import { all } from 'redux-saga/effects'

import bookSagas from './book'


export default function* rootSaga() {
    yield all([...bookSagas])
}
