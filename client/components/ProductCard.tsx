'use client'
import React, {useState} from 'react'
import Modal from './Modal'

const ProductCard = ({product}) => {
  const [showModal, setShowModal] = useState(false);
  const {name, id, description, price} = product

  return (
    <>
      <Modal showModal={showModal} product={product} setShowModal={setShowModal}/>
      <div onClick={()=> setShowModal(!showModal)} className="flex w-44 bg-white rounded-b-lg shadow-lg justify-center cursor-pointer">
        <div className="w-full">
          <img className="rounded-t-lg h-1/2 w-full object-cover" src="https://images.immediate.co.uk/production/volatile/sites/30/2022/09/Spicy-tomato-spaghetti-caf3053.jpg" alt="" />
          
          <div className="px-4 py-3">
            <h5 className="text-gray-900 font-medium  ">{name}</h5>
            <p className="text-gray-700 text-sm">
              {description}
            </p>
            <p className="text-xl font-medium">${price}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard