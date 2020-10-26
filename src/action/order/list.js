import { Toast } from 'components'
import { httpGet } from 'utils/index'

export function error(error) {
  return {
    type: 'ORDER_LIST_ERROR', error,
  }
}

export function loading(loading) {
  return {
    type: 'ORDER_LIST_LOADING', loading,
  }
}

export function success(data) {
  return {
    type: 'ORDER_LIST_SUCCESS', data,
  }
}

export function list(type, obj, page = '/order-client') {
  return (dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    if (type === 3) {
      page = '/order_business'
    } else if (type === 1) {
      page = '/order-all'
    }

    httpGet(page, obj)
      .then((data) => {
        dispatch(loading(false))
        dispatch(success(data.reply))
      })
      .catch((e) => {
        Toast.error('Ocurrió un error.')
        dispatch(loading(false))
        dispatch(error(e.message))
      })
  }
}
