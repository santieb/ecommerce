'use client'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user , setUser] = useState({})

  useEffect(() => {
    const authUser = async () => {        
      const token = localStorage.getItem('token')

      if (!token) return console.log('no tiene token')



      try {
        const config = { 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      
        const res = await fetch('http://localhost:3000/api/users/profile', config)
        const userLogged = await res.json()
        setUser(userLogged)
      } catch (e) {
        setUser({})
      }
    }
    authUser()
  }, [setUser])

  return (
    <html lang="en">
      <head>
        <title>Ecommerce</title>
      </head>
      <body className='bg-orange-50'>
      <NavBar/>
        {children}
      </body>
    </html>
  )
}
