import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { isEmpty } from 'lodash'
import { create as createBusiness } from 'action/business/create'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES, STATE, maps } from 'utils/constantes'
import Ubicacion from 'img/ubicacion.png'

import TextArea from 'components/TextArea'
import Input from 'components/InputForm'
import Button from 'components/Button'
import SidebarRight from 'layout/SidebarRight'

import './style.scss'

const myIcon = L.icon({
  iconUrl: 'https://maps.gstatic.com/tactile/minimap/pegman-offscreen-1x.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})

const siteIcon = L.icon({
  iconUrl: Ubicacion,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})

const myPosition = [-12.187136, -76.975558]

const Routes = () => {
  const [business, setBusiness] = useState([])
  const [showModal, setShowModal] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [locationSelected, setLocationSelected] = useState(null)
  const [nameBusiness, setNameBusiness] = useState('')
  const [descriptionBusiness, setDescriptionBusiness] = useState('')
  const [map, setMap] = useState('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  const dispatch = useDispatch()
  const history = useHistory()

  const postBusiness = useSelector(s => s.business.create)
  const getBusiness = useSelector(s => s.business.list)
  const { id, v_id_rol: idRol, v_id_state: idState } = useSelector(s => s.auth.auth.retrieved.reply)

  useEffect(() => {
    if (!postBusiness.loading && !isEmpty(postBusiness.created)) {
      business.forEach((item, i) => {
        if (business.length -1 === i) {
          item.created = true
          item.name = nameBusiness
          item.description = descriptionBusiness
        }
      })
      setBusiness([...business])
      setShowSidebar(false)
      setLocationSelected(null)
      setNameBusiness('')
      setDescriptionBusiness('')
    }
  }, [postBusiness])

  useEffect(() => {
    if (!getBusiness.loading && !isEmpty(getBusiness.data)) {
      getBusiness.data.forEach(item => item.created = true)
      setBusiness([...getBusiness.data])
    }
  }, [getBusiness])

  const sideOptions = ({ lng, lat }) => {
    if (validateRolesAddBusiness() && idState === STATE.ACTIVE) {
      const newLatLng = {
        id_user: id,
        name: nameBusiness,
        latitud: lat,
        longitud: lng,
        description: descriptionBusiness,
        created: false,
      }
        setLocationSelected(newLatLng)
      if (locationSelected === null) {
        setBusiness([...business, newLatLng])
        setShowSidebar(true)
      } else {
        const newBusiness = business.filter((item) => item.latitud !== locationSelected.latitud)
        setBusiness([...newBusiness, newLatLng])
        setShowSidebar(true)
      }
    }
  }

  const saveBusiness = () => {
    const request = {
      id_user: id,
      name: nameBusiness,
      latitud: locationSelected.latitud.toString(),
      longitud: locationSelected.longitud.toString(),
      description: descriptionBusiness,
    }

    dispatch(createBusiness(request))
  }

  const cancelSaveBusiness = () => {
    setShowSidebar(false)
    const newBusiness = business.filter((item) => item.latitud !== locationSelected.latitud)
    setBusiness([...newBusiness])
    setLocationSelected(null)
  }

  const handleChangeInput = (e, fn) => {
    const { value } = e.target
    fn(value)
  }

  const { ADMINISTRATOR, BUSINESS, CLIENT } = ROLES

  const validateRolesAddBusiness = () => {
    if (ADMINISTRATOR === idRol || 
      (BUSINESS === idRol && !business.find(item => item.id_user === id && item.created))) {
      return true
    } else if (CLIENT === idRol) {
      return false
    }
  }

  const handleRedirectDoOrder = (e, { id_business }) => {
    
    history.push(`/performOrder/${id_business}`)
  }

  const handleSelectedMap = (id) => {
    const newMap = maps.find(map => map.id === id)
    setMap(newMap.map)
  }

  return (
    <>
      <div onClick={() => handleSelectedMap(1)} className="map-option-img map-1">
        <img src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/5/10/15" alt=""/>
      </div>
      <div onClick={() => handleSelectedMap(2)} className="map-option-img map-2">
        <img src="https://b.tile.openstreetmap.org/9/258/181.png" alt=""/>
      </div>
      <div onClick={() => handleSelectedMap(3)} className="map-option-img map-3">
        <img src="https://b.tile.opentopomap.org/5/15/10.png" alt=""/>
      </div>
      <div onClick={() => handleSelectedMap(4)} className="map-option-img map-4">
        <img src="https://b.tile.openstreetmap.org/5/15/10.png" alt=""/>
      </div>
      <div style={{ height: '100vh', width: '100%' }}>
        <Map className="map" center={[-12.0431800, -77.0282400]} zoom={11} animate>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={map}
            
          />

          <Marker position={myPosition} icon={myIcon}>
            <Popup>
              Mi ubicación.
            </Popup>
            <Circle
              center={{lat:-12.187136, lng: -76.975558}}
              fillColor="blue"
              onclick={(e) => {
                sideOptions(e.latlng)
              }}
              radius={900} />
          </Marker>

          {business.map((location, i) => (
            <Marker
              key={i}
              position={[
                location.latitud,
                location.longitud
              ]}
              // onmouseover={() => {
              //   setShowModal(location);
              // }}
              onClick={() => {
                setShowModal(location);
              }}
              icon={siteIcon}
            />
          ))}

          {showModal && (
            <Popup
              position={[
                showModal.latitud,
                showModal.longitud
              ]}
              onClose={() => {
                setShowModal(null);
              }}
            >
              <div>
                <h2>{showModal.name}</h2>
                <span>{showModal.description}</span>
                {CLIENT === idRol && (
                  <Button
                    onClick={e => handleRedirectDoOrder(e, showModal)}
                    type="primary"
                    label="Realizar pedido"
                    style={{ margin: '20px 0px' }}
                  />
                )}
              </div>
            </Popup>
          )}
        </Map>

        <SidebarRight show={showSidebar}>
          <Input inBlock readOnly label="Latitud" value={locationSelected?.latitud} />
          <Input inBlock readOnly label="Longitud" value={locationSelected?.longitud} />
          <Input
            inBlock
            onChange={e => handleChangeInput(e, setNameBusiness)}
            label="Establecimiento"
            value={nameBusiness}
          />
          <TextArea
            inBlock
            onChange={e => handleChangeInput(e, setDescriptionBusiness)}
            label="Descripción"
            value={descriptionBusiness}
          />
          <div className="index-flex-button">
            <Button
              onClick={saveBusiness}
              type="primary"
              label="Guardar"
              load={postBusiness.loading}
              disabled={postBusiness.loading}
            />
          </div>
          <div className="index-flex-button">
            <Button
              onClick={cancelSaveBusiness}
              type="error"
              label="Cancelar"
              load={postBusiness.loading}
              disabled={postBusiness.loading}
            />
          </div>
        </SidebarRight>
      </div>
    </>
  )
}

export default Routes
