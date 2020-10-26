import { Toast } from 'components'
import { httpPost } from 'utils/index'

export function error(error) {
  return {
    type: 'PRODUCT_CREATE_ERROR', error,
  }
}

export function loading(loading) {
  return {
    type: 'PRODUCT_CREATE_LOADING', loading,
  }
}

export function success(created) {
  return {
    type: 'PRODUCT_CREATE_SUCCESS', created,
  }
}

export function create(obj, page = '/product') {
  return (dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpPost(page, obj)
      .then((data) => {
        dispatch(loading(false))
        dispatch(success(data.data))
        Toast.success('Creado satisfactoriamente')
      })
      .catch((e) => {
        Toast.error('Ocurrió un error al intentar crear')
        dispatch(loading(false))
        dispatch(error(e.message))
      })
  }
}
