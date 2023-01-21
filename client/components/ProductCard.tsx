import React, {useState} from 'react'
import Modal from './Modal'

const ProductCard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}/>
      <div onClick={()=> setShowModal(!showModal)} className="flex w-44  h-64  justify-center cursor-pointer">
        <div className=" bg-white max-w-sm">
          <img className="rounded-t-lg h-1/2 w-full object-cover" src="https://images.immediate.co.uk/production/volatile/sites/30/2022/09/Spicy-tomato-spaghetti-caf3053.jpg" alt="" />
          
          <div className="px-4 py-3">
            <h5 className="text-gray-900 font-medium  ">Empanadas</h5>
            <p className="text-gray-700 text-sm">
              Some quick example text
            </p>
            <p className="text-xl font-medium">$3.400</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard