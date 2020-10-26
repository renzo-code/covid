import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { list as listDetailOrder } from 'action/detailOrder/list'
import { SERVER } from 'utils/constantes'
import { isEmpty } from 'lodash'
import { useParams } from 'react-router-dom'

import './style.scss'

const DetailOrder = () => {
  const [detailOrder, setDetailOrder] = useState([])
  const params = useParams()
  const dispatch = useDispatch()

  const { data: dataDetailOrder, error: errorDetailOrder, loading: loadingDetailOrder } = useSelector((s) => s.detailOrder.detailOrder)

  useEffect(() => {
    dispatch(listDetailOrder(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if (!loadingDetailOrder && !errorDetailOrder && !isEmpty(dataDetailOrder)) {
      setDetailOrder(dataDetailOrder)
    }
  }, [dataDetailOrder, errorDetailOrder, loadingDetailOrder])

  const listDetailOrderJsx = () => {
    if (isEmpty(detailOrder)) return <></>
    const listDetailOrderJsx = detailOrder.map((item, i) => (
      <tr key={i}>
        <td>{item.id_detalle_pedido}</td>
        <td>{item.article}</td>
        <td>{item.unit_price}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <td><a href={`${SERVER}${item.url}`} rel="noopener noreferrer" target="_blank">Image</a></td>
        <td>{item.verify === 0 ? 'Confirmar' : 'Anular'}</td>
      </tr>
    ))
    return listDetailOrderJsx
  }

  return (
    <div className="view">
      <h1>DETALLE PEDIDO</h1>
      <div className="wrapper-table">
        <table className="table table-dp">
          <thead>
            <tr>
              <th>ID</th>
              <th>Articulo</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Preview</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listDetailOrderJsx()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DetailOrder