import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { error, loading, success } from 'action/product/list'

import Products from './Products'
import Create from './Create'
import NotFound from 'routes/404'

const Web = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(error(null))
      dispatch(loading(false))
      dispatch(success([]))
    }
  }, [dispatch])
  return (
    <Switch>
      <Route exact path="/product" component={Products} />
      <Route path="/product/create" component={Create} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Web
