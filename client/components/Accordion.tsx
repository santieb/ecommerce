'use client'
import React, { useState, useRef, useEffect } from "react"
import { useUserStore } from '../state/Products'
import { redirect } from 'next/navigation';

type AccordionProps = {
  title: string
  content: string
}
const Accordion = ({ title, content }: AccordionProps) => {
  const [isOpened, setOpened] = useState<boolean>(false)
  const [height, setHeight] = useState<string>("0px")
  const contentElement = useRef(null)

  const HandleOpening = () => {
    setOpened(!isOpened)
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px")
  }



  const user = useUserStore((state) => state.user)
  console.log('request', user)

  useEffect(() => {
    if (user.isAdmin === false)
      redirect('/products');
  }, []);

  return (
    <>
      <div onClick={HandleOpening} className=" cursor-pointer cursor-pointerbg-white border-b hover:bg-gray-50 ">
        1
      </div>
      <div onClick={HandleOpening} className=" cursor-pointer cursor-pointerbg-white border-b hover:bg-gray-50 ">
        Thomas Barreto 
      </div>
      <div onClick={HandleOpening} className=" cursor-pointer cursor-pointerbg-white border-b hover:bg-gray-50 ">
        5  
      </div>
      <div onClick={HandleOpening} className=" cursor-pointer cursor-pointerbg-white border-b hover:bg-gray-50 ">
        $5000
      </div>
      
      <div  ref={contentElement}
        style={{ height: height }}
        className="col-span-4 bg-gray-100 overflow-hidden transition-all duration-200 flex justify-center items-center" >
        
          <div className='p-4'>Pizza Primavera x 4</div>
          <div>$8000</div>
        
      </div>
   
 </>
  )
}

export default Accordion