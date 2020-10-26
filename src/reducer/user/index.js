import { combineReducers } from 'redux';

import create from './create'
import show from './show'

const reducer = combineReducers({
  create, show,
})

export default reducer
