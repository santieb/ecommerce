import React, { useState, useRef } from "react"
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
        className="col-span-4 bg-gray-200 overflow-hidden transition-all duration-200" >
        <td colspan='3' className="p-8">
          <div>Pizza Primavera x 4</div>
        </td>
        <td colspan='3' className="">
          <div>$8000</div>
        </td>
      </div>
   
 </>
  )
}

export default Accordion