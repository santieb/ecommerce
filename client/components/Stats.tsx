import React from 'react'

const Stats = () => {
  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800 text-center">
        <div className="grid gap-x-6 lg:gap-x-12 md:grid-cols-3">
          <div className="mb-12 md:mb-0">
            <h2 className="text-3xl font-bold display-5 text-orange-600 mb-4">
              +800
            </h2>
            <h5 className="text-lg font-medium mb-4">Resenas positivas</h5>
            <p className="text-gray-500">
              Mas de 800 resenas positivas
            </p>
          </div>

          <div className="mb-12 md:mb-0">
            <h2 className="text-3xl font-bold display-5 text-orange-600 mb-4">
              70%
            </h2>
            <h5 className="text-lg font-medium mb-4">Growth</h5>
            <p className="text-gray-500">
              Eum nostrum fugit numquam, voluptates veniam neque quibusdam
              ullam
            </p>
          </div>

          <div className="mb-12 md:mb-0">
            <h2 className="text-3xl font-bold display-5 text-orange-600 mb-4">
              +50
            </h2>
            <h5 className="text-lg font-medium mb-4">Menus</h5>
            <p className="text-gray-500">
              Mas de 50 menus diferentes, para tu gusto, y el de todos
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Stats