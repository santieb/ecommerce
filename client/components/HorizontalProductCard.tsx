import React, {useState} from 'react'
import Modal from './Modal'

const HorizontalProductCard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}/>
      <div onClick={()=> setShowModal(!showModal)} className="h-32 cursor-pointer flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover">
            <img className='w-full h-full object-cover' src='https://images.deliveryhero.io/image/pedidosya/products/292190-518af1f7-7219-4456-a52a-1cbfd0e27ef3.jpg?quality=90&height=96&width=96&webp=1'>
            </img>
        </div> 
        <div className=" flex flex-col jusify-between w-2/3 p-4">
          <h4 className="text-gray-900 font-medium">Backpack</h4>
          <p className="text-gray-700 text-sm"> elit In odit exernam quia elit In odit exernam quia</p>
          <div className="flex item-center justify-between mt-3">
            <h4 className="text-xl font-medium">$220</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default HorizontalProductCard