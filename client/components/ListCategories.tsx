'use client'
import React, {useState} from 'react'
import {MdArrowDropDown, MdArrowDropUp} from 'react-icons/md'

const ListCategories = ({categories}) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} className="flex pb-2 text-xl font-medium ">
        Categorias 
        { isOpen ? <MdArrowDropDown size={24}/> : <MdArrowDropUp size={24}/>}
      </div>
      { isOpen &&  
        <ul className='text-gray-800'>
          {categories.map(category => (
            <li key={category.name}>{category.name}</li>
          ))}
        </ul>
      }
    </div>
  )
}

export default ListCategories