import { Toast } from 'components'
import { httpPut } from 'utils/index'

export function error(error) {
  return {
    type: 'ORDER_UPDATE_ERROR', error,
  }
}

export function loading(loading) {
  return {
    type: 'ORDER_UPDATE_LOADING', loading,
  }
}

export function updated(updated) {
  return {
    type: 'ORDER_UPDATE_SUCCESS', updated,
  }
}

export function update(obj, page = '/order-change-state') {
  return (dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpPut(page, obj)
      .then((data) => {
        dispatch(loading(false))
        dispatch(updated(data.reply))
        Toast.success('Actualizado satisfactoriamente')
      })
      .catch((e) => {
        Toast.error('Ocurrió un error al actualizar')
        dispatch(loading(false))
        dispatch(error(e.message))
      })
  }
}

export function reset() {
  return {
    type: 'ORDER_RESET',
  }
}