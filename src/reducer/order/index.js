import { combineReducers } from 'redux'

import create from './create'
import list from './list'
import update from './update'

export default combineReducers({
  create,
  list,
  update,
})
