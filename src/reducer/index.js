import { combineReducers } from 'redux'

import user from './user'
import auth from './auth'
import business from './business'
import order from './order'
import detailOrder from './detailOrder'
import product from './product'

const reducer = combineReducers({
  user,
  auth,
  business,
  order,
  detailOrder,
  product,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    localStorage.removeItem('eco-place')

    return {
      ...state,
      auth: {
        auth: {
          retrieved: null,
          error: null,
          loading: false,
        }
      },
      // business: {
      //   list: {
      //     data: [],
      //     error: null,
      //     loading: false
      //   }
      // },
      // order: {
      //   list: {
      //     created: null,
      //     error: null,
      //     loading: false,
      //   },
      //   create: {
      //     created: null,
      //     error: null,
      //     loading: false,
      //   },
      //   update
      // }
      // userCompanies: {
      //   list: {
      //     data: null,
      //     error: null,
      //     loading: false,
      //   },
      //   select: {
      //     selectedCompany: null,
      //     selectedFiscalYear: null,
      //     selectedDocument: null,
      //     selectedEmployee: null,
      //   },
      //   role: {
      //     userRole: null,
      //   },
      // },
    }
  }

  return reducer(state, action)
}

export default rootReducer
