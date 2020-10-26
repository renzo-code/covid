import { throttle } from 'lodash'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducer'
import { loadState, saveState } from './localStorage'

const persistedState = loadState()
const middlewares = [thunk]
const enhancers = [applyMiddleware(...middlewares)]

export const store = createStore(
  rootReducer,
  persistedState,
  compose(...enhancers),
)

const configureStore = () => {

  store.subscribe(
    throttle(() => {
      saveState({
        auth: store.getState().auth
      })
    }),
  )

  return store
}

export default configureStore
