import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useUserStore } from '../state/Products'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import { BsPersonCircle } from 'react-icons/bs'

const NavBar = () => {
  const user = useUserStore((state) => state.user)
  console.log('request', user)

  return (
    <nav className="w-full navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center justify-between">
      <div className="px-6 w-full flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link className="navbar-brand text-orange-600 " href="/">
            <Image src={'/fff.png'} width={50} height={50} alt='logo pedidos'/>
          </Link>
        </div>
        <div className="flex items-center lg:ml-auto">
          {
            user?.name ? <Link href={'/profile'}className='flex p-2 rounded items-center active:bg-gray-200 bg-transparent text-orange-600 hover:text-orange-700 hover:bg-gray-100 focus:bg-gray-100'  >
              <span className='text-gray-600 mr-2'> {user.name } </span> <BsPersonCircle className="text-2xl text-orange-600"/> 
            </Link> 
            :
            <>
              <RegisterModal/>
              <LoginModal/>
            </>
          }
          
        </div>
      </div>
    </nav>
  )
}

export default NavBar