import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Loader } from 'components'

const Web = lazy(() => import('./Web'))
const Signin = lazy(() => import('./Signin'))
const RetrievePassword = lazy(() => import('./RetrievePassword'))
const Signup = lazy(() => import('./Register'))

const Routes = () => (
  <Suspense fallback={<Loader />}>
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/retrieve" component={RetrievePassword} />
        <Route path="/signin" component={Signin} />
        <Route path="/" component={Web} />
      </Switch>
    </Router>
  </Suspense>
)

export default Routes
