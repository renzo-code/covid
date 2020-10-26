import { combineReducers } from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'ORDER_UPDATE_ERROR':
      return action.error;

    case 'ORDER_RESET':
      return null;

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'ORDER_UPDATE_LOADING':
      return action.loading;

    case 'ORDER_RESET':
      return false;

    default:
      return state;
  }
}

export function updated(state = null, action) {
  switch (action.type) {
    case 'ORDER_UPDATE_SUCCESS':
      return action.updated;

    case 'ORDER_RESET':
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  error, loading, updated,
});