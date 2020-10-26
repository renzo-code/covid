import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Login from './Login'
import NotFound from 'routes/404'

const Signin = () => (
  <Switch>
    <Route path="/signin" component={Login} />
    <Route component={NotFound} />
  </Switch>
)

export default withRouter(Signin)
