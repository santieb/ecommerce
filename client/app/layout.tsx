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
      <body>
        <div className="fixed top-4 right-4">
          </div>
          <div className="w-full bg-orange-300 text-5xl">
            <h1 className="text-white font-extrabold text-center uppercase">
              restaurant
            </h1>
        </div>
        {children}
      </body>
    </html>
  )
}
