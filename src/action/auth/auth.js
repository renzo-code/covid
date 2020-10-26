import { httpPost } from 'utils/index'

export function error(error) {
  return {
    type: 'USER_SHOW_ERROR', error,
  }
}

export function loading(loading) {
  return {
    type: 'USER_SHOW_LOADING', loading,
  }
}

export function retrieved(retrieved) {
  return {
    type: 'USER_SHOW_RETRIEVED_SUCCESS', retrieved,
  }
}

export function retrieve(obj, page = '/login') {
  return (dispatch) => {
    dispatch(loading(true))

    httpPost(page, obj)
      .then((data) => {
        dispatch(loading(false))
        dispatch(retrieved(data))
        dispatch(error(null))
      })
      .catch((e) => {
        dispatch(loading(false))
        dispatch(error(e.message))
      })
  }
}

export function logout() {
  return {
    type: 'LOG_OUT',
  }
}
