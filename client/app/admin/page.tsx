'use client'
import React,{useState, useEffect} from 'react'
import Accordion from '../../components/Accordion'
import { redirect } from 'next/navigation';

const page = () => {

  const [isOpened, setOpened] = useState<boolean>(false)
  const [height, setHeight] = useState<string>("0px")


  const HandleOpening = () => {
    setOpened(!isOpened)
    
  }

  return (
    <div className="max-w-fit m-auto">
      <div className="grid grid-cols-4 items-center text-center">
              <div >id</div>
              <div >nombre</div>
              <div>cantidad</div>
              <div>total</div>
              <Accordion title='content' content='cononasdnasoj ajsg'/>
              <Accordion/>
              <Accordion/>
              <Accordion/>
      </div>
    </div>
  )
}

export default page