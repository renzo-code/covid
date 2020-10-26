import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Wrapper, Left, Right, Form } from './style'
import { Input, Loader, Button } from 'components'
import { retrieve } from 'action/auth/auth'
import './style.scss'
const Image = lazy(() => import('./component'))

const Routes = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useSelector(state => state.auth.auth)
  const { retrieved, loading } = login
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (retrieved) {
      history.push('/index')
    }
  },[retrieved, history])

  const handleInputChange = (e, fn) => {
    const { value } = e.target
    fn(value)
  }

  const handleSignin = () => {
    const request = {
      email,
      password,
    }
    dispatch(retrieve(request))
  }

  const handleRedirectSignUp = () => {
    history.push('/signup')
  }

  return (
    <>
      <Wrapper>
        <Left>
          <Suspense fallback={<Loader />}>
            <Image />
          </Suspense>
        </Left>
        <Right>
          <Form>
            <h2>Iniciar sesión</h2>
            <h2>Ir a Eco-place</h2>
            <Input
              inBlock
              label="Usuario"
              onChange={e => handleInputChange(e, setEmail)}
            />
            <Input
              inBlock
              label="Password"
              type="password"
              onChange={e => handleInputChange(e, setPassword)}
            />
            <div className="button-signin">
              <Button type="success" label="Sign in"  load={loading} onClick={handleSignin} />
            </div>
            <div className="button-signin">
              <Button type="primary" label="Sign up"  load={loading} onClick={handleRedirectSignUp} />
            </div>
          </Form>
        </Right>
      </Wrapper>
    </>
  )
}

export default Routes
