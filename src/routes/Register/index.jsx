import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Signup from './Signup'
import NotFound from 'routes/404'

const Router = () => (
  <>
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route component={NotFound} />
    </Switch>
    <ToastContainer
      position="bottom-right"
      hideProgressBar
      draggable={false}
      toastClassName="custom-toast-container"
      bodyClassName="custom-toast-body"
    />
  </>
)

export default withRouter(Router)
