'use client'
import React, {useState} from 'react'
import Modal from './Modal'
import truncateString from '../utils/truncateString';

const HorizontalProductCard = ({product}) => {
  const [showModal, setShowModal] = useState(false);
  const {name, id, description, price} = product

  return (
    <>
      <Modal showModal={showModal} product={product} setShowModal={setShowModal}/>
      <div onClick={()=> setShowModal(!showModal)} className="h-32 cursor-pointer w-full flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover">
            <img className='w-full h-full object-cover' src='https://images.deliveryhero.io/image/pedidosya/products/292190-518af1f7-7219-4456-a52a-1cbfd0e27ef3.jpg?quality=90&height=96&width=96&webp=1'>
            </img>
        </div> 
        <div className=" flex flex-col jusify-between w-2/3 p-4">
          <h4 className="text-gray-900 font-medium">{truncateString(name, 50)}</h4>
          <p className="text-gray-700 text-sm"> {truncateString(description, 80)}</p>
          <div className="flex item-center justify-between mt-3">
            <h4 className="text-xl font-medium">${price}</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default HorizontalProductCard