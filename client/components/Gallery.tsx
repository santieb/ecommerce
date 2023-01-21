import Image from 'next/image'
import React from 'react'

const Gallery = () => {
  return (
    <div className="container my-24 px-6 mx-auto">
    <section className="mb-32 text-gray-800">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Los menus mas <u className="text-blue-600">pedidos</u>
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">
        <div
          className="zoom shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
          style={{ "backgroundPosition": "50%" }}
        >
          <Image
            src="https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png"
            className="w-full transition duration-300 ease-linear align-middle"
            width="500"
            height="500"
            alt=""
          />
          <a href="#!">
            <div
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
              style={{ "backgroundColor": "rgba(0, 0, 0, 0.3)" }}
            >
              <div className="flex justify-start items-end h-full">
                <h5 className="text-lg font-bold text-white m-6">
                  Burger
                </h5>
              </div>
            </div>
            <div className="hover-overlay">
              <div
                className="mask absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-500"
                style={{ "backgroundColor": "rgba(253, 253, 253, 0.15)" }}
              >
              </div>
            </div>
          </a>
        </div>

        <div
          className="zoom shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
          style={{ "backgroundPosition": "50%" }}
        >
          <Image
            src="https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png"
            className="w-full transition duration-300 ease-linear align-middle"
            width="500"
            height="500"
            alt=""
          />
          <a href="#!">
            <div
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
              style={{ "backgroundColor": "rgba(0, 0, 0, 0.3)" }}
            >
              <div className="flex justify-start items-end h-full">
                <h5 className="text-lg font-bold text-white m-6">
                  Burger
                </h5>
              </div>
            </div>
            <div className="hover-overlay">
              <div
                className="mask absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-500"
                style={{ "backgroundColor": "rgba(253, 253, 253, 0.15)" }}
              >
              </div>
            </div>
          </a>
        </div>

        <div
          className="shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
          style={{ "backgroundPosition": "50%" }}
        >
          <Image
            src="https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png"
            className="w-full transition duration-300 ease-linear align-middle"
            width="500"
            height="500"
            alt=""
          />
          <a href="#!">
            <div
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
              style={{ "backgroundColor": "rgba(0, 0, 0, 0.3)" }}
            >
              <div className="flex justify-start items-end h-full">
                <h5 className="text-lg font-bold text-white m-6">
                  Burger
                </h5>
              </div>
            </div>
            <div className="hover-overlay">
              <div
                className="mask absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-500"
                style={{ "backgroundColor": "rgba(253, 253, 253, 0.15)" }}
              >
              </div>
            </div>
          </a>
        </div>

        <div
          className="zoom shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
          style={{ "backgroundPosition": "50%" }}
        >
          <Image
            src="https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png"
            className="w-full transition duration-300 ease-linear align-middle"
            width="500"
            height="500"
            alt=""
          />
          <a href="#!">
            <div
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
              style={{ "backgroundColor": "rgba(0, 0, 0, 0.3)" }}
            >
              <div className="flex justify-start items-end h-full">
                <h5 className="text-lg font-bold text-white m-6">
                  Burger
                </h5>
              </div>
            </div>
            <div className="hover-overlay">
              <div
                className="mask absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-500"
                style={{ "backgroundColor": "rgba(253, 253, 253, 0.15)" }}
              >
              </div>
            </div>
          </a>
        </div>

        <div
          className="zoom shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
          style={{ "backgroundPosition": "50%" }}
        >
          <Image
            src="https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png"
            className="w-full transition duration-300 ease-linear align-middle"
            width="500"
            height="500"
            alt=""
          />
          <a href="#!">
            <div
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
              style={{ "backgroundColor": "rgba(0, 0, 0, 0.3)" }}
            >
              <div className="flex justify-start items-end h-full">
                <h5 className="text-lg font-bold text-white m-6">
                  Burger
                </h5>
              </div>
            </div>
            <div className="hover-overlay">
              <div
                className="mask absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-500"
                style={{ "backgroundColor": "rgba(253, 253, 253, 0.15)" }}
              >
              </div>
            </div>
          </a>
        </div>

        <div
          className="zoom shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
          style={{ "backgroundPosition": "50%" }}
        >
          <Image
            src="https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png"
            className="w-full transition duration-300 ease-linear align-middle"
            width="500"
            height="500"
            alt=""
          />
          <a href="#!">
            <div
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
              style={{ "backgroundColor": "rgba(0, 0, 0, 0.3)" }}
            >
              <div className="flex justify-start items-end h-full">
                <h5 className="text-lg font-bold text-white m-6">
                  Burger
                </h5>
              </div>
            </div>
            <div className="hover-overlay">
              <div
                className="mask absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-500"
                style={{ "backgroundColor": "rgba(253, 253, 253, 0.15)" }}
              >
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
  )
}

export default Gallery