import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Wrapper, Left, Right, Form } from './style'
import { retrieve as createUser } from 'action/auth/auth'
import { Input, Loader, Button } from 'components'
import './style.scss'

const Image = lazy(() => import('./component'))

const Routes = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [typeUser, setTypeUser] = useState(null)
  const createdUser = useSelector(state => state.auth.auth)
  const { retrieved, loading, error } = createdUser
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!loading && retrieved && !error) {
      history.push('/index')
    }
  },[retrieved, error, history, loading])

  const handleInputChange = (e, fn) => {
    const { value } = e.target
    fn(value)
  }

  const handleSignin = () => {
    history.push('/signin')
  }

  const handleSignup = () => {
    const request = {
      email,
      password,
      rol: typeUser
    }
    dispatch(createUser(request, '/user'))
  }

  const handleSelectTypeUser = (id) => {
    setTypeUser(id)
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
            <h2>Registrarse</h2>
            <Input
              inBlock
              label="Email"
              onChange={e => handleInputChange(e, setEmail)}
            />
            <Input
              inBlock
              label="Password"
              type="password"
              onChange={e => handleInputChange(e, setPassword)}
            />
            <h4>Seleccione tipo usuario :</h4>
            <div className="select-type-rol">
              <div onClick={() => handleSelectTypeUser(2)} style={typeUser === 2 ? { border: '2px solid green' } : {} }>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRi1c29WeXpiXp6UspHN6fdepdOfZ_qWc_nSSrrn6hcPmgZszUB&usqp=CAU" alt=""/>
              </div>
              <div onClick={() => handleSelectTypeUser(3)} style={typeUser === 3 ? { border: '2px solid green' } : {} }>
                <img src="https://cdn3.iconfinder.com/data/icons/flat-ecommerce-online-shopping/128/store-01-icon-512.png" alt=""/>
              </div>
            </div>
            <div className="button-signin">
              <Button type="success" label="Sign up"  load={loading} onClick={handleSignup} />
            </div>
            <div className="button-signin">
              <Button type="primary" label="Sign in"  load={loading} onClick={handleSignin} />
            </div>
          </Form>
        </Right>
      </Wrapper>
    </>
  )
}

export default Routes
