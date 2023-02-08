import React from 'react'

export const Button = ({children, theme, onClick}) => {
  return (
    <button
      type="button"
      className={`${theme === 'primary' ? " bg-orange-600 text-white hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-800"
        : "active:bg-gray-200 bg-transparent text-orange-600 hover:text-orange-700 hover:bg-gray-100 focus:bg-gray-100" } 
        inline-block px-6 py-2.5 mr-2  font-medium text-xs leading-tight uppercase rounded hover:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out
      `}
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

