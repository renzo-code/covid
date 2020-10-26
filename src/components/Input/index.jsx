import React from 'react'
import sc from 'styled-components'

const Input = ({ color, label, type, textColor }) => {
  return (
    <Group>
      <GroupInput color={color} type={type} required="required" textColor={textColor} />
      {/* <span className="highlight"></span> */}
      <Bar color={color} className="bar" ></Bar>
      <Label>{label}</Label>
    </Group>
  )
}

export default Input

const Group = sc.div`
  position: relative;
  margin: 20px 0px;
  height: 50px;
  width: 100%;
`

const GroupInput = sc.input`
  background: none;
  // color: mix(white, #424242, 70%);
  color: ${(props) => (props.textColor || 'black')};;
  font-size: 12px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: red;
  // border-bottom: 1px solid mix(white, #424242, 70%);
  &:focus {
    outline: none;
  }
  &:focus ~ label,
  &:valid ~ label {
    top: -14px;
    font-size: 12px;
    color: ${(props) => (props.color || 'black')}; //
  }
  &:focus ~ .bar:before {
    width: 100%;
  }
`

const Bar = sc.span`
  position: relative;
  display: block;
  width: 100%;
  &:before {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    background: ${(props) => (props.color || 'black')}; //
    transition: 300ms ease all;
    left: 0%;
  } 
`

const Label = sc.label`
  // color: mix(white, #424242, 70%);
  color: gray;
  font-size: 16px;
  font-weight: bold;
  font-family: monospace;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
`