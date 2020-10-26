import React from 'react'
import { Switch, Route, withRouter, useRouteMatch, useHistory, useLocation, useParams } from 'react-router-dom'

import RetrievePassword from './Retrieve'
import NotFound from 'routes/404'

const Retrieve = () => {
  const useRoute = useRouteMatch()
  const useH = useHistory()
  const useL = useLocation()
  const useP = useParams()
  console.log('useRoute', useRoute)
  console.log('useH', useH)
  console.log('useL', useL)
  console.log('useP', useP)
  return (
    <Switch>
      <Route path="/retrieve" component={RetrievePassword} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default withRouter(Retrieve)
