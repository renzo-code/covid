import React from 'react'
import { toast } from 'react-toastify'
import classnames from 'classnames'
import 'react-toastify/dist/ReactToastify.css'

import './style.scss'

const Custom = ({ message, type }) => (
  <div>
    <div
      style={{
        marginRight: 7,
      }}
    >
      <i
        aria-hidden="true"
        className={classnames({
          'check circle': type === 'success',
          'times circle': type === 'error',
          'warning circle': type === 'warning',
          'info circle': type === 'info',
        })}
      />
    </div>
    {message}
  </div>
)

export function success(message) {
  toast.success(<Custom message={message} type="success" />)
}

export function error(message) {
  toast.error(<Custom message={message} type="error" />)
}

export function warning(message) {
  toast.warn(<Custom message={message} type="warning" />)
}

export function info(message) {
  toast.info(<Custom message={message} type="info" />)
}
