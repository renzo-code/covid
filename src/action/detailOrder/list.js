import { Toast } from 'components'
import { httpGet } from 'utils/index'

export function error(error) {
  return {
    type: 'DETAIL_ORDER_LIST_ERROR', error,
  }
}

export function loading(loading) {
  return {
    type: 'DETAIL_ORDER_LIST_LOADING', loading,
  }
}

export function success(data) {
  return {
    type: 'DETAIL_ORDER_LIST_SUCCESS', data,
  }
}

export function list(obj, page = '/detailOrder') {
  return (dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

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
