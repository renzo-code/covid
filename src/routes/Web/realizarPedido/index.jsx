import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { create as createOrder, success, error, loading } from 'action/order/create'
import { list as listProduct } from 'action/product/list'
import { isEmpty } from 'lodash'
import { SERVER } from 'utils/constantes'

import Button from 'components/Button'
import Loader from 'components/Loader'
import SidebarRight from 'layout/SidebarRight'

import './style.scss'

const PerformOrder = () => {
  const params = useParams()
  const history = useHistory()

  if (!params.id)  {
    history.push('/')
  }

  const business = useSelector((s) => s.business.list.data)
  const user = useSelector((s) => s.auth.auth.retrieved)
  const [products, setProducts ] = useState([])
  const { created: orderCreated, error: orderError, loading: orderLoading } = useSelector((s) => s.order.create)
  const { data: productData, loading: productLoading, error: productError } = useSelector((s) => s.product.list)
  const [businessSelected, setBusinessSelected] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])
  const [priceTotal, setPriceTotal] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!orderLoading && !orderError && !isEmpty(orderCreated)) {
      history.push('/order')
    }
  }, [orderLoading, orderError, orderCreated, history, dispatch])

  useEffect(() => {
    if (!isEmpty(business)) {
      const reply = business.find(({ id_business }) => id_business === parseInt(params.id, 10))
      setBusinessSelected(reply)
    }
  },[business, params.id])

  useEffect(() => {
    return () => {
      dispatch(success(null))
      dispatch(loading(false))
      dispatch(error(null))
    }
  },[dispatch])

  const handlePerformOrder = () => {
    const request = {
      selectedProducts,
      idUser: user.reply.id,
      idBusiness: businessSelected.id_business,
      emailClient: user.reply.v_email,
      emailBusiness: businessSelected.email,
      description: '',
      total: (priceTotal).toFixed(2)
    }
    dispatch(createOrder(request))
  }

  useEffect(() => {
    if (!isEmpty(businessSelected)) {
      dispatch(listProduct(businessSelected.id_business))
    }
  }, [businessSelected, dispatch])

  useEffect(() => {
    if (!isEmpty(productData) && !productLoading && !productError) {
      setProducts(productData)
    }
  }, [productData, productLoading, productError])

  useEffect(() => {
    return () => {
      dispatch(error(null))
      dispatch(loading(false))
      dispatch(success([]))
    }
  }, [dispatch])

  const listOrders = () => {
    if (isEmpty(products)) return <></>
    const listOrders = products.map((item, i) => (
      <div className="item-data-product" key={i} onClick={() => handleSelectedProduct(item)}>
        <img src={`${SERVER}${item.url}`} alt=""/>
        <p>{item.name}</p>
        <span>Precio: S./{item.price}</span>
      </div>
    ))
    return listOrders
  }

  const handleSumPrice = (arrayProducts) => {
    let sumPrice = 0
    arrayProducts.forEach((item) => sumPrice += (item.price * item.quantity))

    setPriceTotal(sumPrice)
  }

  const handleSelectedProduct = (item) => {
    const exist = selectedProducts.find(product => product.id_product === item.id_product)

    if (!exist) {
      item.quantity = 1
      item.priceCount = item.price
      setSelectedProducts([...selectedProducts, item])
      handleSumPrice([...selectedProducts, item])
    }
  }

  const handleChangeInput = ({ target }, fn, { id_product }) => {
    let value = null
    const newSelectedProducts = selectedProducts.map((item) => {
      if (item.id_product === id_product) {
        value = parseInt(target.value, 10)
        item.quantity = String(value) === 'NaN' || String(value) === '0' ? 1 : value
        item.priceCount = item.price * (String(value) === 'NaN' || String(value) === '0' ? 1 : value)
        return item
      }
      return item
    })

    handleSumPrice(newSelectedProducts)
    fn(newSelectedProducts)
  }

  return (
    <div className="pedido-content">
      <h2>Perform Order</h2>
      <div className="perdido-form">
        <div className="perdido-business-data">
          <div>
            <span>Nombre : </span>
            <span>{businessSelected.name}</span>
          </div>
          <div>
            <span>Descripción : </span>
            <span>{businessSelected.description}</span>
          </div>
        </div>
        <span>Cantidad : {0}</span>
        <div style={{height: '50px'}}></div>
        <div className="pedido-add-order">
          <div className="list-data-products">
            {!productLoading && isEmpty(productData) && (<Loader />)}
            {listOrders()}
          </div>
        </div>
      </div>
      <div className="pedido-button-order">
        <Button type="primary" label="Perform Order" load={orderLoading} onClick={handlePerformOrder} />
      </div>
      <SidebarRight show={!isEmpty(selectedProducts)}>
        {selectedProducts.map((item, i) => (
          <div className="detail-buy" key={i}>
            <p>{item.name}</p>
            <div>
              <span>Precio: S./{(item.price * item.quantity).toFixed(2)}</span>
              <input min="1" type="number" value={item.quantity} onChange={e => handleChangeInput(e, setSelectedProducts, item)} />
            </div>
          </div>
        ))}
        <p>Total S./{priceTotal.toFixed(2)}</p>
      </SidebarRight>
    </div>
  )
}

export default PerformOrder
