import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from 'action/auth/auth'

import './style.scss'

const GeoJsonMap = () => {
  const auth = useSelector(state => state.auth.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/signin')
  }

  return (
    <div className="profile" onClick={handleLogout}>
      <p>{(auth?.retrieved?.reply?.v_email).charAt(0)}</p>
      {/* <div className="profiles">
      </div> */}
      {/* <div className="profile-options">
        Cerrar session
      </div> */}
    </div>
  )
}

export default GeoJsonMap
