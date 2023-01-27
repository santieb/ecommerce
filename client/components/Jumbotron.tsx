import React from 'react'

const Jumbotron = () => {
  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-6 xl:gap-12 items-center">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight">
              Haz tenido una buena <br />
              <span className="text-orange-600">experiencia?</span>
            </h2>
          </div>
          <div className="mb-6 lg:mb-0">
            <p className="uppercase text-orange-600 font-bold mb-4">Learn more</p>
            <p className="text-gray-500 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              officia consequatur adipisci tenetur repudiandae rerum quos.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Jumbotron