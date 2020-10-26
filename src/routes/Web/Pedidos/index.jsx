import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { list as listOrder, error, loading, success } from 'action/order/list'
import { isEmpty } from 'lodash'

import Order from './Pedidos'
import DetailOrder from './DetallePedido'
import NotFound from 'routes/404'

const Web = () => {
  const dispatch = useDispatch()
  const auth = useSelector((s) => s.auth.auth.retrieved.reply)
  const listBusiness = useSelector((s) => s.business.list.data)

  useEffect(() => {
    if (auth.v_id_rol === 3) {
      if (!isEmpty(listBusiness)) {
        const business = listBusiness.find(item => item.id_user === auth.id)
        dispatch(listOrder(auth.v_id_rol, business.id_business))
      }
    } else {
      dispatch(listOrder(auth.v_id_rol, auth.id))
    }
  },[dispatch, auth, listBusiness])

  useEffect(() => {
    return () => {
      dispatch(success(null))
      dispatch(loading(false))
      dispatch(error(null))
    }
  },[dispatch])

  return (
    <Switch>
      <Route exact path="/order" component={Order} />
      <Route path="/order/:id" component={DetailOrder} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Web
