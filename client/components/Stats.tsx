import React from 'react'

const Stats = () => {
  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Lo que nos distingue
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="mb-8 md:mb-0">
            <h3 className="text-4xl font-extrabold text-orange-600 mb-2">+800</h3>
            <h5 className="text-lg font-semibold mb-2">Reseñas positivas</h5>
            <p className="text-gray-500">
              La comunidad elige y recomienda. Gracias por bancarnos en cada pedido.
            </p>
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-4xl font-extrabold text-orange-600 mb-2">70%</h3>
            <h5 className="text-lg font-semibold mb-2">Clientes que vuelven</h5>
            <p className="text-gray-500">
              Sabor consistente y entregas a tiempo: el combo que hace que repitas.
            </p>
          </div>

          <div className="mb-0">
            <h3 className="text-4xl font-extrabold text-orange-600 mb-2">+50</h3>
            <h5 className="text-lg font-semibold mb-2">Menús activos</h5>
            <p className="text-gray-500">
              Clásicos y novedades de temporada para que siempre tengas algo nuevo que probar.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Stats
