import React from 'react'
import Link from 'next/link'

const Jumbotron = () => {
  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-6 xl:gap-12 items-center">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight">
              ¿Tuviste una buena <span className="text-orange-600">experiencia</span>?
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl">
              Tu opinión nos ayuda a mejorar y a que más personas nos conozcan. 
              Contanos qué te gustó del pedido y qué te gustaría ver en el menú.
            </p>
          </div>
          <div className="mb-6 lg:mb-0">
            <p className="uppercase text-orange-600 font-bold mb-3">Tu voz vale</p>
            <p className="text-gray-500 text-lg mb-6">
              Leemos cada comentario. Si algo no salió como esperabas, escribinos: lo resolvemos rápido.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="products"
                className="px-6 py-3 rounded-full bg-orange-500 text-white text-sm uppercase font-semibold hover:bg-orange-600 transition"
              >
                Dejar reseña
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Jumbotron
