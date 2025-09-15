import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Gallery = () => {
  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Los <u className="text-orange-600">más pedidos</u>
        </h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { title: 'Burger Clásica', img: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png' },
            { title: 'Burger Doble Queso', img: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png' },
            { title: 'Burger BBQ', img: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png' },
            { title: 'Burger Criolla', img: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png' },
            { title: 'Burger Veggie', img: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png' },
            { title: 'Burger Picante', img: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Sesame-Seeds-Cheese-and-Veggies.png' },
          ].map((card, idx) => (
            <div
              key={idx}
              className="shadow-lg rounded-lg relative overflow-hidden bg-no-repeat bg-cover"
              style={{ backgroundPosition: "50%" }}
            >
              <Image
                src={card.img}
                className="w-full transition duration-300 ease-linear align-middle"
                width={600}
                height={500}
                alt={card.title}
              />
              <Link href="products">
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden bg-fixed"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="flex justify-start items-end h-full">
                    <h5 className="text-lg font-bold text-white m-6 drop-shadow">
                      {card.title}
                    </h5>
                  </div>
                </div>
                <div className="hover-overlay">
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"
                    style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Gallery
