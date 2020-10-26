import React from 'react'
import sc from 'styled-components'

const Input = ({ speed, color }) => {
  return (
    <Content>
    <Wrapper speed={speed} color={color}>
      <Loading>
        <TextCenter></TextCenter>
      </Loading>
    </Wrapper>
    <Text>Loading ....</Text>
    </Content>
  )
}

export default Input

const Content = sc.div`
  padding: 10% 42%;
`

const Wrapper = sc.div`
  width: 90px;
  height: 90px;
  background: linear-gradient(to right, ${(props) => (props.color || '#c6c6c6')}, white);
  border-radius: 50%;
  animation: rotate ${(props) => (props.speed ? props.speed+'s' : '.3s')} infinite linear;
  @keyframes rotate {
    0%{ transform: rotate(0deg) }
    100%{ transform: rotate(360deg) } 
  }
`

const Loading = sc.div`

`

const TextCenter = sc.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  left: 5px;
  top: 5px;
`

const Text = sc.p`
  width: 90px;
  text-align: center;
  transform: translateY(-55px);
  font-size: 13px;
  color: ${(props) => (props.color || '#727272')}
`