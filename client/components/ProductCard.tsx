import React from 'react'
import styles from './ProductCard.module.css'
import { BsInfoCircle } from 'react-icons/bs'

const ProductCard = () => {
  return (
    <div className={styles.wrapper}>
  <div className={styles.container}>
    <div className={styles.top}></div>
    <div className="p-4 h-1/5 flex justify-between items-center">
      <h1 className="uppercase text-xl">Chair</h1>
      <p className='font-bold text-xl text-gray-700'>
        £250
      </p>
    </div>
   
   
  </div>
  <div className={styles.inside}>
    <div className={`${styles.icon} `}>
      <i><BsInfoCircle size={20}/></i>
    </div>
    <div className={styles.contents}>
      <table>
        <tr>
          <th>Width</th>
          <th>Height</th>
        </tr>
        <tr>
          <td>3000mm</td>
          <td>4000mm</td>
        </tr>
        <tr>
          <th>Something</th>
          <th>Something</th>
        </tr>
        <tr>
          <td>200mm</td>
          <td>200mm</td>
        </tr>
        <tr>
          <th>Something</th>
          <th>Something</th>
        </tr>
        <tr>
          <td>200mm</td>
          <td>200mm</td>
        </tr>
        <tr>
          <th>Something</th>
          <th>Something</th>
        </tr>
        <tr>
          <td>200mm</td>
          <td>200mm</td>
        </tr>
      </table>
    </div>
  </div>
</div>
  )
}

export default ProductCard