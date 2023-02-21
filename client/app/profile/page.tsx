import React from 'react'
import Accordion from '../../components/Accordion'

const page = () => {
  return (
    <div className='w-full'>
      <main className='m-auto w-6/12'>
        <h2 className="pt-8 pb-4 text-2xl font-medium ">Mis Pedidos</h2>
        <div className="grid grid-cols-4 items-center text-center bg-white">
          <div className='border-b font-medium'>id</div>
          <div className='border-b font-medium'>nombre</div>
          <div className='border-b font-medium'>cantidad</div>
          <div className='border-b font-medium'>total</div>
          
          <Accordion title='content' content='cononasdnasoj ajsg'/>
          <Accordion/>
          <Accordion/>
          <Accordion/>
        </div>
      </main>
    </div>
  )
}

export default page