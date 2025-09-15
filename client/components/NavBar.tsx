import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useUserStore } from '../state/Products'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import { BsPersonCircle } from 'react-icons/bs'
import { MdReceiptLong } from 'react-icons/md' // ícono para pedidos

const NavBar = () => {
  const user = useUserStore((state) => state.user)

  return (
    <nav className="w-full shadow-md py-2 bg-white relative flex items-center justify-between">
      <div className="px-6 w-full flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link className="navbar-brand text-orange-600 " href="/">
            <Image src={'/fff.png'} width={50} height={50} alt="logo pedidos" />
          </Link>
        </div>

        <div className="flex items-center lg:ml-auto gap-2">
          {user?.name ? (
            <>
              <Link
                href="/orders"
                className="flex items-center gap-1 px-3 py-2 rounded text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-100"
              >
                <MdReceiptLong className="text-lg text-orange-600" />
                Mis pedidos
              </Link>

              <Link
                href="/profile"
                className="flex p-2 rounded items-center bg-transparent text-orange-600 hover:text-orange-700 hover:bg-gray-100 focus:bg-gray-100"
              >
                <span className="text-gray-600 mr-2">{user.name}</span>
                <BsPersonCircle className="text-2xl text-orange-600" />
              </Link>
            </>
          ) : (
            <>
              <RegisterModal />
              <LoginModal />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
