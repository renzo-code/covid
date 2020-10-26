import React from 'react'

import Load from 'img/load.png'

import './style.scss'

const CButton = ({
  label,
  type = 'default',
  onClick,
  load = false,
  disabled = false,
  style = {}
}) => (
  <div className="c-wrapper-button" style={style}>
    <button
      type="button"
      disabled={disabled}
      className={`button ${type}`}
      onClick={onClick}
    >
      <div className="c-button-text">
        {load && <img src={Load} alt="load" className="load" />}
        <span>{label}</span>
      </div>
    </button>
  </div>
)

export default CButton
