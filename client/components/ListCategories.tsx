import React, {useState} from 'react'
import {MdArrowDropDown, MdArrowDropUp} from 'react-icons/md'

const ListCategories = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} className='font-medium flex items-center cursor-pointer'>
        Categorias 
        { isOpen ? <MdArrowDropDown size={24}/> : <MdArrowDropUp size={24}/>}
      </div>
      { isOpen &&  
        <ul className='text-gray-800'>
          <li>asdasdasfasf</li>
          <li>asdasdasfasf</li>
          <li>asdasdasfasf</li>
          <li>asdasdasfasf</li>
          <li>asdasdasfasf</li>
          <li>asdasdasfasf</li>
          <li>asdasdasfasf</li>
          <li>asdasdasfasf</li>
          <li>asdasdasfasf</li>
        </ul>
      }
    </div>
  )
}

export default ListCategories