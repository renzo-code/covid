import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { list as listProduct, error, loading, success } from 'action/product/list'
import { useHistory } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { SERVER } from 'utils/constantes'

import Button from 'components/Button'
import Loader from 'components/Loader'

import './style.scss'

const Orders = () => {
  const [products, setProducts ] = useState([])
  const businessSelected = useSelector((s) => s.business.list.businessSelected)
  const { data: productData, loading: productLoading, error: productError } = useSelector((s) => s.product.list)
  const history = useHistory()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (businessSelected) {
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
      <div className="item-data-product" key={i}>
        <img src={`${SERVER}${item.url}`} alt=""/>
        <p>{item.name}</p>
        <span>Precio: S./{item.price}</span>
      </div>
    ))
    return listOrders
  }

  const handleRedirectCreateProduct = () => {
    history.push('/product/create')
  }

  return (
    <div className="view">
      <h1>Mis productos</h1>
      <div className="index-flex-button btn-new-product">
        <Button type="success" onClick={handleRedirectCreateProduct} label="Agregar nuevo producto" ></Button>
      </div>
      <div className="list-data-products">
        {productLoading && (<Loader />)}
        {listOrders()}
      </div>
    </div>
  )
}

export default Orders