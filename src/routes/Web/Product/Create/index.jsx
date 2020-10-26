import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create as createProduct, success, loading, error } from 'action/product/create'
import { success as successListProduct } from 'action/product/list'
import { isEmpty, cloneDeep } from 'lodash'
import { useHistory } from 'react-router-dom'

import Button from 'components/Button'
import Input from 'components/InputForm'

import './style.scss'

const DetailOrder = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [base64, setBase64] = useState('')
  const [image, setImage] = useState('')
  const { created: productCreated, loading: productLoading, error: productError } = useSelector((s) => s.product.create)
  const getProducts = useSelector((s) => s.product.list.data)
  const businessSelected = useSelector((s) => s.business.list.businessSelected)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!isEmpty(productCreated) && !productLoading && !productError) {
      const newData = cloneDeep([...getProducts, productCreated])
      successListProduct(newData)
      history.push('/product')
    }
  }, [productCreated, productLoading, productError, history, getProducts])

  useEffect(() => {
    return () => {
      dispatch(success(null))
      dispatch(loading(false))
      dispatch(error(null))
    }
  }, [dispatch])

  const uploadImage = async (e) => {
    const { files } = e.target

    if (files[0]) {
      setImage(files[0])
      const data = new FileReader()
      data.onload = (ev) => {
        ev.preventDefault()
        const base64 = data.result
        setBase64(base64)
      }

      data.readAsDataURL(files[0])
    }
  }

  const handleInputChange = (e, set) => {
    set(e.target.value)
  }

  const handleCreateProduct = () => {

    const formData = new FormData()
    formData.append("file", image)
    formData.append("id_business", businessSelected?.id_business)
    formData.append("name", name)
    formData.append("price", price)

    dispatch(createProduct(formData))
  }

  return (
    <div className="view">
      <h1>Crear producto</h1>
      <div className="form-create-product">
        <Input
          label="Nombre"
          onChange={(e) => handleInputChange(e, setName)}
          disabled={productLoading}
          value={name}
        />
        <Input
          label="Precio"
          onChange={(e) => handleInputChange(e, setPrice)}
          disabled={productLoading}
          value={price}
        />
        <Input
          type="file"
          label="Imagen"
          onChange={uploadImage}
          disabled={productLoading}
          accept="image/png, image/jpeg, image/gif"
        />
        {base64 && (
          <div className="image-product">
            <img src={base64} alt="" disabled={false} />
          </div>
        )}
        <div className="index-flex-button">
          <Button
            type="primary"
            label="Crear"
            load={productLoading}
            disabled={productLoading}
            onClick={handleCreateProduct}
          />
        </div>
      </div>
    </div>
  )
}

export default DetailOrder
