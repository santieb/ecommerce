import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
      <div className="px-6 w-full flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link className="navbar-brand text-orange-600 " href="/">
            <Image src={'/fff.png'} width={50} height={50} alt='logo pedidos'/>
          </Link>
        </div>
        <div className="flex items-center lg:ml-auto">
          <button
            type="button"
            className="inline-block px-6 py-2.5 mr-2 bg-transparent text-orange-600 font-medium text-xs leading-tight uppercase rounded hover:text-orange-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Login
          </button>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Sign up for free
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar