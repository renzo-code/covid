import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROLES } from 'utils/constantes'
import Logo from 'img/logo.svg'

import './style.scss'

const Sidebar = () => {
  const auth = useSelector((s) => s.auth.auth.retrieved.reply)

  return (
    <div className="l-sidebar-left">
      <div className="l-spacing-top" />
      <div className="l-left-link">
        <div>
          <img src={Logo} alt=""/>
        </div>
        <Link to="/" className="name-proyect" >Eco - place</Link>
      </div>
      <div className="l-left-link">
        <div>
          <img src="https://img.icons8.com/cotton/2x/track-order.png" alt=""/>
        </div>
        <Link to="/">Ver establecimientos</Link>
      </div>
      <div className="l-left-link">
        <div>
          <img src="https://img.icons8.com/emoji/2x/shopping-bags.png" alt=""/>
        </div>
        <Link to="/order">Mis pedidos</Link>
      </div>
      {auth.v_id_rol === ROLES.BUSINESS && (
        <div className="l-left-link">
          <div>
            <img src="https://img.icons8.com/office/2x/open-box.png" alt=""/>
          </div>
          <Link to="/product">Mis productos</Link>
        </div>
      )}
      <div className="l-left-link">
        <div>
          <img src="https://img.icons8.com/clouds/2x/purchase-order.png" alt=""/>
        </div>
        <Link to="">Historial de pedidos</Link>
      </div>
      <div className="l-left-link">
        <div>
          <img src="https://img.icons8.com/officel/2x/change-user-male.png" alt=""/>
        </div>
        <Link to="">Mi cuenta</Link>
      </div>
    </div>
  )
}

export default Sidebar
