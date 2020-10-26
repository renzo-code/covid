import axios from 'axios'

import { store } from 'store/store'

axios.defaults.baseURL = 'http://18.222.225.213/api/v1'
const access_token = localStorage.getItem('eco-place')

export const httpGet = async (page, params) => {
  const service = params ? `${page}/${params}` : page

  try {
    if (page === '/login') {
      const response = await axios.get(service)

      return response.data
    } else {

      const response = await axios.get(service, {
        headers : {
          Authorization: `Bearer ${store.getState().auth?.auth?.retrieved?.token}`,
        }
      })

      return response.data
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const httpPost = async (page, params) => {
  try {
    if (page === '/user') {
    const response = await axios.post(page, params)

    return response.data
  } else {
    const response = await axios.post(page, params, {
      headers : {
        Authorization: `Bearer ${store.getState().auth?.auth?.retrieved?.token}`,
      }
    })

    return response.data
  }
  } catch (error) {
    throw new Error(error)
  }
}

export const httpPut = async (page, params) => {
  try {
    const response = await axios.put(page, params, {
      headers : {
        Authorization: `Bearer ${store.getState().auth?.auth?.retrieved?.token}`,
      }
    })

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const httpDelete = async (page, params) => {
  try {
    const response = await axios.delete(page, params, {
      headers : {
        Authorization: `Bearer ${store.getState().auth?.auth?.retrieved?.token}`,
      }
    })

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
