'use client'
import React, {useState} from 'react'
import Modal from './Modal'

const ProductCard = ({product}) => {
  const [showModal, setShowModal] = useState(false);
  const {name, id, description, price, image} = product

  return (
    <>
      <Modal showModal={showModal} product={product} setShowModal={setShowModal}/>
      <div
        onClick={() => setShowModal(!showModal)}
        className="flex w-64 bg-white rounded-b-lg shadow-lg justify-center cursor-pointer"
      >
        <div className="w-full">
          <img
            className="rounded-t-lg h-48 w-full object-cover"
            src={image}
            alt={name}
          />
          
          <div className="px-4 py-3">
            <h5 className="text-gray-900 font-medium text-lg">{name}</h5>
            <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
            <p className="text-xl font-semibold mt-2">${price}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
