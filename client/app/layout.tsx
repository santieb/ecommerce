'use client'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useUserStore } from '../state/Products'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const { getUser } = useUserStore()

  useEffect(() => {
    getUser()
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Ecommerce</title>
        <script src="https://sdk.mercadopago.com/js/v2" />
      </head>
      <body className='bg-orange-50'>
      <NavBar/>
        {children}
      </body>
    </html>
  )
}
