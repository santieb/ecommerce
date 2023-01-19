'use client'
import React,{useState} from 'react'
import Accordion from '../../components/Accordion'

const page = () => {

  const [isOpened, setOpened] = useState<boolean>(false)
  const [height, setHeight] = useState<string>("0px")


  const HandleOpening = () => {
    setOpened(!isOpened)
    
  }

  return (
    <div className="max-w-fit m-auto">
    <div className="grid grid-cols-4  ">
            <div >id</div>
            <div >nombre</div>
            <div>cantidad</div>
            <div>total</div>
            <div>05</div>
            <div>04</div>
            <div>05</div>
            <div>04</div>
            <div>05</div>
            <Accordion/>
            <Accordion/>
            <Accordion/>
            <Accordion/>
    </div>
    <div class="flex flex-col w-56">
		
	</div>
</div>
  )
}

export default page