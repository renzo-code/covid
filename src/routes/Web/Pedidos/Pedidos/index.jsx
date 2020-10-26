import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  update as updateOrder, updated, error, loading } from 'action/order/update'
import { useHistory } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { STATE_ORDER, ROLES, STATE } from 'utils/constantes'

import { Toast } from 'components'
import Combo from 'components/ComboBox'

import './style.scss'

const Orders = () => {
  const [orders, setOrders ] = useState([])
  const listBusiness = useSelector(s => s.business.list.data)
  const user = useSelector((s) => s.auth.auth.retrieved)
  const { data: dataOrders, error: errorOrders, loading: loadingOrders } = useSelector((s) => s.order.list)
  const { updated: updatedOrder, error: errorUpdatedOrder, loading: loadingUpdatedOrder } = useSelector((s) => s.order.update)
  const history = useHistory()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!loadingOrders && !errorOrders && !isEmpty(dataOrders)) {
      setOrders(dataOrders)
    }
  }, [dataOrders, errorOrders, loadingOrders])

  useEffect(() => {
    if (!loadingUpdatedOrder && !isEmpty(updatedOrder)) {
      const newOrders = orders.map(item => {
        if (item.id_pedido === updatedOrder.id_pedido) {
          return updatedOrder
        }
        return item
      })
      setOrders([...newOrders])
    }

    return () => {
      dispatch(updated(null))
      dispatch(error(null))
      dispatch(loading(false))
    }
  }, [updatedOrder, errorUpdatedOrder, loadingUpdatedOrder, dispatch])

  const handleViewDetail = (id) => {
    history.push(`/order/${id}`)
  }

  const handleChange = (e, obj) => {
    const { value } = e.target

    if (Number(value) > obj.id_state) {
      const requet = {
        idPedido: obj.id_pedido,
        newState: Number(value),
        emailClient: obj.email,
      }
      dispatch(updateOrder(requet))
    } else {
      Toast.warning('El estado es incorrecto')
    }
  }

  const listOrders = () => {
    if (isEmpty(orders)) return <></>
    const listOrders = orders.map((item, i) => (
      <tr key={i}>
        <td>{item.id_pedido}</td>
        <td>{item.description}</td>
        <td>{item.created.split('T')[0]}</td>
        <td>{item.state}</td>
        <td>{item.updated_last || '-'}</td>
        <td>{item.total_price}</td>
        <td onClick={() => handleViewDetail(item.id_pedido)}>Detalle</td>
        {user.reply.v_id_rol === ROLES.BUSINESS
          ? (
              <td>
                <Combo
                  value={STATE_ORDER}
                  onChange={e => handleChange(e, item)}
                  selected={item.id_state}
                  readOnly={item.id_state === STATE.CANCELED || loadingUpdatedOrder}
                />
              </td>
          ) : (
              <td>
                {listBusiness.find(b => b.id_business === item.id_business).name}
              </td>
          )}
      </tr>
    ))
    return listOrders
  }

  return (
    <div className="view">
      <h1>PEDIDOS</h1>
      <div className="wrapper-table">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Creado</th>
              <th>Estado</th>
              <th>Actualizado</th>
              <th>Total</th>
              <th></th>
              <th>Establecimiento</th>
            </tr>
          </thead>
          <tbody>
            {listOrders()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders