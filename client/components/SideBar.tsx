import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useUserStore } from '../state/Products'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import { BsPersonCircle } from 'react-icons/bs'

const SideBar = () => {
  const user = useUserStore((state) => state.user)
  console.log('request', user)

  return (
    <h1>SideBar</h1>
  )
}

export default SideBar