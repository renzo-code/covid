
import sc from 'styled-components'

export const Wrapper = sc.div`
  display: flex;
  justify-content: around-between;
  width: 100vw;
  height: 100vh;
  // overflow: scroll;
  overflow-x: hidden;
  overflow-y: hidden;
`

export const Left = sc.div`
  width: 40%;
  height: 100%;
`

export const Right = sc.div`
  width: 60%;
  height: 100%;
  padding: 100px 5%;
  background-color: #e6e6e6;
`

export const Form = sc.div`
  position: relative;
  margin: 50px 15%;
  border: 1px solid #adadad;
  border-radius: 7px;
  padding: 30px 20px;
  & > h4  {
    font-weight: 100;
    padding-left: 20px;
    margin-top:10px;
  }
  & h2 {
    text-align: center;
    &:last-child {
      margin: 10px 0px 30px;
    }
    // color: #409eff;
  }
`

export const n = 10
