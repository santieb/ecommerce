import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useUserStore } from '../state/Products'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const NavBar = () => {
 

  const { getUser, user } = useUserStore();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="w-screen navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
      <div className="px-6 w-full flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link className="navbar-brand text-orange-600 " href="/">
            <Image src={'/fff.png'} width={50} height={50} alt='logo pedidos'/>
          </Link>
        </div>
        <div className="flex items-center lg:ml-auto">
          <RegisterModal/>
          <LoginModal/>
        </div>
      </div>
    </nav>
  )
}

export default NavBar