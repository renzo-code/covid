import React from 'react'
import ImgNotFound from 'img/not-found.png'
import './style.scss'

const NotFound = () => (
  <div className="notfound-content">
    <h1>Not Found 404</h1>
    <img src={ImgNotFound} alt="" />
  </div>
)

export default NotFound