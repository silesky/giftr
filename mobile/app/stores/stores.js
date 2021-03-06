// TODO: The NEW Access Token is not being saved to the DB on login

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './../reducers/'

import {
  saveToAsyncStorage,
  getFromAsyncStorage,
  updateUserDataByAccessToken,
  updateUserByBody,
} from './../utils/'

import { hydrateAll } from './../actions'

/*
const composeEnhancers = composeWithDevTools({
  name: 'GiftKeep',
  port: 8080, // works in conjunction remotedev --hostname=localhost --port=8080
  realtime: true,
  shouldRecordChanges: true, // need to manually click record changes, recording slows down app.
  actionsBlacklist: [ 'FRIEND_FORM_NAME_INPUT' ], // when I add a seccond item to this array, it doesn't work
})
*/
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  // composeEnhancers(applyMiddleware(thunk))
)

console.log('store created.')

export const storeStateInAsyncStorage = () => {
  // whenever the store changes, save it to async storage
  try {
    saveToAsyncStorage('store', store.getState())
  } catch (err) {
    console.log(err)
  }
}

export const storeStateInDb = () => {
  const state = store.getState()
  updateUserByBody({ user: state.user })
    .then(successOrFail => successOrFail) // get rid of console
    .catch(err => console.log('stores.js', err))
}

// on first load
export const hydrateFromAsyncStorage = () => {
  return getFromAsyncStorage('store').then(res => {
    const savedState = JSON.parse(res)
    store.dispatch(hydrateAll(savedState))
  }).catch(e => {
    console.log('async error caught', e)
    store.dispatch(hydrateAll({}))
  })
}

hydrateFromAsyncStorage()
store.subscribe(storeStateInAsyncStorage)
store.subscribe(storeStateInDb)
