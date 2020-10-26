import React from 'react'
import { Provider } from 'react-redux'
import 'style.css'
import App from 'routes'
import 'react-toastify/dist/ReactToastify.min.css';

const Root = ({ store }) => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

export default Root
