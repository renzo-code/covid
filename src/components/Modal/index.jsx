import React, { useRef, useEffect } from "react"
import "./style.scss"

export default function App({ header, children, buttonName, type = 'p', image = '', classType }) {
  const refModal = useRef()

  const openModal = () => {
    refModal.current.style.display = "block"
  }

  const closeModalIf = e => {
    if (e.target === refModal.current) {
      refModal.current.style.display = "none"
    }
  }

  const closeModal = () => {
    refModal.current.style.display = "none"
  }

  useEffect(() => {
    window.addEventListener("click", closeModalIf)
    return () => {
      window.removeEventListener("click", closeModalIf)
    }
  })

  return (
    <>
      {type === 'p' && (
        <p className="name-button-modal" onClick={openModal}>{buttonName}</p>
      )}
      {type === 'img' && (
        // <p className="name-button-modal" onClick={openModal}>{buttonName}</p>
        <img onClick={openModal} className={classType} src={image} alt=""/>
      )}
      <div className="modal" ref={refModal}>
        <div className="contentModal">
          <div className="close">
            <h3 className="headerModal">{header}</h3>
            <span onClick={closeModal}>x</span>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
