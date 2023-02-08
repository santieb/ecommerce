import NavBar from '../components/NavBar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
