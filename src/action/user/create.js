import { Toast } from 'components'
import { httpPost } from 'utils/index'

export function error(error) {
  return {
    type: 'USER_CREATE_ERROR', error,
  }
}

export function loading(loading) {
  return {
    type: 'USER_CREATE_LOADING', loading,
  }
}

export function success(created) {
  return {
    type: 'USER_CREATE_SUCCESS', created,
  }
}

export function create(obj, page = '/user') {
  return (dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpPost(page, obj)
      .then((data) => {
        dispatch(loading(false))
        dispatch(success(data))
        // Toast.success('Creado satisfactoriamente')
      })
      .catch((e) => {
        Toast.error('Ocurrió un error al intentar crear')
        dispatch(loading(false))
        dispatch(error(e.message))
      })
  }
}
