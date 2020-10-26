import React from 'react'
import Logo from 'img/login.svg'
import sc from 'styled-components'

// const {  } = lazy(() => import('./style'))

const Routes = () => <Image src={Logo} alt="imagen del logo" />

// solman@janaq.com

export default Routes

const Image = sc.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`