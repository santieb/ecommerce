import Link from "next/link";
import Stats from "../components/Stats";
import Jumbotron from "../components/Jumbotron";
import Gallery from "../components/Gallery";

export default function Home() {
  return (
    <>

          <div
            className="relative overflow-hidden bg-no-repeat bg-cover"
            style={{
              backgroundPosition: "50%",
              backgroundImage:
                "url('https://i.imgur.com/whrvYUE.jpg')",
              height: "500px",
            }}
          >
            <div
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
            >
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-white px-6 md:px-12">
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                    Primero la comida<br />
                    <span>segundo francia </span>
                  </h1>
                    <Link
                      className="inline-block px-7 py-3 mr-1.5 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      href="products"
                      role="button"
                    >
                      Hacer pedido!
                    </Link>
                </div>
              </div>
            </div>
          </div>

      <Stats/>
      <Gallery/>
      <Jumbotron/>
    </>
  );
}
