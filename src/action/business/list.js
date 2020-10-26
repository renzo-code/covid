import { Toast } from 'components'
import { httpGet } from 'utils/index'

export function error(error) {
  return {
    type: 'BUSINESS_LIST_ERROR', error,
  }
}

export function loading(loading) {
  return {
    type: 'BUSINESS_LIST_LOADING', loading,
  }
}

export function success(data) {
  return {
    type: 'BUSINESS_LIST_SUCCESS', data,
  }
}

export function businessSelected(data) {
  return {
    type: 'BUSINESS_SELECTED_LIST_SUCCESS', data,
  }
}

export function list(id, obj, page = '/business') {
  return (dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpGet(page, obj)
      .then((data) => {
        dispatch(loading(false))
        dispatch(success(data.reply))
        const business = data.reply.find(item => item.id_user === id)
        if (business) {
          dispatch(businessSelected(business))
        }
      })
      .catch((e) => {
        Toast.error('Ocurrió un error.11')
        dispatch(loading(false))
        dispatch(error(e.message))
      })
  }
}
