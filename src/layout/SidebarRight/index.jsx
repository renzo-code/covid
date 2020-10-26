import React from 'react'

import './style.scss'

const Sidebar = ({ show, children }) => {
  return (
    <div className="l-sidebar-right" style={show ? { right: '0px' } : { right: `${-250}px` }}>
      <h2>Configuración</h2>
      {children}
    </div>
  )
}

export default Sidebar
