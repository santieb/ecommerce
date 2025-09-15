import Link from "next/link";
import Stats from "../components/Stats";
import Jumbotron from "../components/Jumbotron";
import Gallery from "../components/Gallery";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <div
        className="relative overflow-hidden bg-no-repeat bg-cover"
        style={{
          backgroundPosition: "50%",
          backgroundImage: "url('https://i.imgur.com/whrvYUE.jpg')",
          height: "560px",
        }}
      >
        <div
          className="absolute inset-0 w-full h-full bg-fixed"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 100%)" }}
        >
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-white px-6 md:px-12 max-w-5xl">
              <p className="uppercase tracking-widest text-orange-300 text-sm md:text-base mb-2">
                Río Grande · Tierra del Fuego
              </p>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-4">
                Primero, la comida.<br />
                <span className="text-orange-400">Segundo, todo lo demás.</span>
              </h1>
              <p className="text-base md:text-lg text-gray-200/90 max-w-3xl mx-auto mb-8">
                Platos frescos, porciones generosas y un servicio que llega a tiempo. 
                Elegí tu favorito y nosotros nos encargamos del resto.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <Link
                  className="inline-block px-7 py-3 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-white hover:text-black transition duration-150 ease-in-out"
                  href="products"
                  role="button"
                >
                  Hacer pedido
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20">
                  ⏱️ Entrega estimada 30–45 min
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20">
                  🧾 Ticket digital
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20">
                  🔒 Pago 100% seguro
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Stats />
      <Jumbotron />
    </>
  );
}
