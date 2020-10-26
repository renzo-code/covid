import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'lodash'
import { ToastContainer } from 'react-toastify'
import { list as listBusiness } from 'action/business/list'

import Info from '../../components/Info'
import Index from './Index'
import Otros from './Otros'
import PerformOrder from './realizarPedido'
import Product from './Product'
import Order from './Pedidos'
import NotFound from 'routes/404'
import SidebarLeft from 'layout/SidebarLeft'

const Web = () => {
  const auth = useSelector(state => state.auth.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isEmpty(auth.retrieved)) {
      dispatch(listBusiness(auth.retrieved.reply.id))
    }
  }, [auth.retrieved, dispatch])

  if (!isEmpty(auth.retrieved)) {

    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect
                to={{
                  pathname: '/index'
                }}
              />
            )}
          />
          <Route path="/index" component={Index} />
          <Route path="/order" component={Order} />
          <Route path="/product" component={Product} />
          <Route path="/performOrder/:id" component={PerformOrder} />
          <Route path="/otros" component={Otros} />
          <Route component={NotFound} />
        </Switch>
        <Info />
        <SidebarLeft />
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          draggable={false}
          toastClassName="custom-toast-container"
          bodyClassName="custom-toast-body"
        />
      </>
    )
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect
            to={{
              pathname: '/signin',
            }}
          />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Web
